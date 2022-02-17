import React, { useEffect, useState, useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Html } from '@react-three/drei'
import { CircularProgress, Box } from '@mui/material'
import Loader from '../Loader'

const SENSITIVITY = 0.003 / 2

export default function Model() {

    const Mesh = () => {
        const gltf = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/models/scene.gltf`)
        const [mouse, setMouse] = useState({
            x: 0,
            y: 0
        })
        const handleMouseMove = (e) => {
            setMouse({
                x: e.clientX,
                y: e.clientY
            })
        }

        const handleDeviceMotion = (e) => {
            console.log('Here')
            const y = Math.round(e.accelerationIncludingGravity.y)
            const x = Math.round(e.accelerationIncludingGravity.x)
            if (y && x)
                setMouse({
                    x,
                    y
                })
        }

        const obj = useRef()
        useFrame(() => {
            if (obj.current) {
                obj.current.rotation.x = mouse.y * SENSITIVITY
                obj.current.rotation.y = mouse.x * SENSITIVITY
            }
        })

        useEffect(() => {
            if (detectMob()) {
                //window.addEventListener('devicemotion', handleDeviceMotion)
                if (window.DeviceOrientationEvent) {
                    window.addEventListener("deviceorientation", function (event) {
                        //tilt([event.beta, event.gamma]);
                        setMouse({
                            x: event.beta * 200,
                            y: event.alpha * 5
                        })
                    }, true);
                } else if (window.DeviceMotionEvent) {
                    window.addEventListener('devicemotion', function (event) {
                        //tilt([event.acceleration.x * 2, event.acceleration.y * 2]);
                        setMouse({
                            x: event.acceleration.x * 2,
                            y: event.acceleration.y * 2
                        })
                    }, true);
                } else {
                    window.addEventListener("MozOrientation", function (orientation) {
                        //tilt([orientation.x * 50, orientation.y * 50]);
                        setMouse({
                            x: orientation.x * 50,
                            y: orientation.y * 50
                        })
                    }, true);
                }
            }
            else
                window.addEventListener('mousemove', handleMouseMove)
            return () =>
                detectMob() ?
                    null
                    :
                    window.addEventListener('mousemove', handleMouseMove)
        })

        const detectMob = () => {
            const toMatch = [
                /Android/i,
                /webOS/i,
                /iPhone/i,
                /iPad/i,
                /iPod/i,
                /BlackBerry/i,
                /Windows Phone/i
            ];

            return toMatch.some((toMatchItem) => {
                return navigator.userAgent.match(toMatchItem);
            });
        }

        return (
            <mesh
                ref={obj}
                position={[0, -6, -8]}
                scale={[1.2, 1.2, 1.2]}
            >
                <primitive
                    object={gltf.scene}
                />
            </mesh>
        )
    }

    const LoadingComponent = () => (
        <Html
            style={{
                /* display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', */
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                zIndex: 99999,
            }}
        >
            <Loader />
        </Html>
    )

    return (
        <Canvas
            camera={{
                fov: 80
            }}
        >
            <directionalLight position={[0, 6, 0]} intensity={8} color='#304fff' />
            <pointLight position={[-5, 0, 0]} intensity={3} color='#FFFCEF' />
            <Suspense fallback={<LoadingComponent />}>
                <Mesh />
            </Suspense>
        </Canvas>
    )

}
