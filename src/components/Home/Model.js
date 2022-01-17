import React, { useEffect, useState, useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Html } from '@react-three/drei'
import { CircularProgress, Box } from '@mui/material'
import Loader from '../Loader'

const SENSITIVITY = 0.003 / 3

export default function Model() {

    const Mesh = () => {
        const gltf = useLoader(GLTFLoader, '/models/scene.gltf')
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

        const obj = useRef()
        useFrame(() => {
            if (obj.current) {
                obj.current.rotation.x = mouse.y * SENSITIVITY * 0.5
                obj.current.rotation.y = mouse.x * SENSITIVITY
            }
        })

        useEffect(() => {
            window.addEventListener('mousemove', handleMouseMove)
            return () => window.addEventListener('mousemove', handleMouseMove)
        })

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
