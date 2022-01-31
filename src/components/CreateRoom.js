import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Add, Chat, CopyAll, Lock, Person, Share } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Checkbox, Divider, FormControl, IconButton, Link, Paper, Stack, TextField, Typography, Skeleton } from '@mui/material'

import Model from './Home/Model'
import { LoadingButton } from '@mui/lab'
import Bubbles from './Home/Bubbles'
import Footer from './Footer'

import { generateAvatarUrl, generateRoomCode } from '../utils'
import { useNavigate } from 'react-router-dom'

export default function CreateRoom({ noFooter, onCreateRoom }) {
    const [username, setUsername] = useState('')
    const [roomName, setRoomName] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [room, setRoom] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        setRoom({
            roomCode: generateRoomCode(),
            roomAvatar: generateAvatarUrl()
        })
    }, [])

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value)
    }

    const joinRoom = () => {
        setLoading(true)
        onCreateRoom({
            room_code: room.roomCode,
            room_name: roomName,
            username,
            room_avatar: room.roomAvatar,
            onSuccess: (payload) => {
                navigate(payload.navigate)
            }
        })
    }

    return (
        <Box
            sx={{
                overflow: {
                    xs: 'auto',
                    md: 'hidden'
                }
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    zIndex: -1,
                    left: 0,
                    right: 0,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Bubbles />
            </Box>
            <Stack
                spacing={1}
                alignItems='center'
                sx={{
                    margin: {
                        xs: 2,
                        md: 'none'
                    }
                }}
            >
                <Model />
                <Card
                    sx={{ minWidth: 'xs', borderRadius: 2 }}
                    raised
                >
                    <CardContent>
                        <Stack
                            direction='column'
                            alignItems='stretch'
                            spacing={3}
                            padding={2}
                        >
                            <Stack
                                spacing={1}
                                alignItems='center'
                            >
                                <Typography
                                    variant='h4'
                                >
                                    Create a room
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='GrayText'
                                    fontFamily='SFProText-Regular'
                                    maxWidth={350}
                                >
                                    Enter a username so that people can recognise you
                                </Typography>
                            </Stack>
                            <TextField
                                label='Room name'
                                placeholder='Enter room name'
                                value={roomName}
                                onChange={handleRoomNameChange}
                                type='text'
                                required
                                inputProps={{
                                    maxLength: 100
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <Chat color='primary' />
                                    )
                                }}
                                fullWidth
                            />
                            <TextField
                                label='Username'
                                placeholder='Enter a username'
                                value={username}
                                onChange={handleUsernameChange}
                                type='text'
                                required
                                inputProps={{
                                    maxLength: 100
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <Person color='primary' />
                                    )
                                }}
                                fullWidth
                            />
                            <Stack>
                                <Typography
                                    variant='body2'
                                    color='GrayText'
                                >
                                    Your room code
                                </Typography>
                                {
                                    room?.roomCode ?
                                        <Paper
                                            className='p-2 px-3'
                                            sx={{
                                                background: '#7B7CFF25',
                                                boxShadow: 'none',
                                                cursor: 'text'
                                            }}
                                            onClick={() => {
                                                /**
                                                 * @TODO
                                                 * show snackbar and also copy room code
                                                 */
                                            }}
                                        >
                                            <Stack
                                                direction='row'
                                                justifyContent='space-between'
                                                alignItems='center'
                                            >

                                                <Typography
                                                    letterSpacing={10}
                                                    variant='h6'
                                                    fontFamily='SFProText-Bold'
                                                >
                                                    {room?.roomCode}
                                                </Typography>
                                                <Stack
                                                    direction='row'
                                                    spacing={1}
                                                >
                                                    <IconButton
                                                        onClick={() => console.log("Copied")}
                                                    >
                                                        <Share color='primary' />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => console.log("Copied")}
                                                    >
                                                        <CopyAll color='primary' />
                                                    </IconButton>
                                                </Stack>
                                            </Stack>
                                        </Paper>
                                        :
                                        <Skeleton variant='text' width='100%' height={40} animation='wave' />
                                }
                            </Stack>
                            <Stack
                                spacing={1}
                            >
                                <LoadingButton
                                    variant='contained'
                                    startIcon={<Lock />}
                                    fullWidth
                                    size='large'
                                    loading={isLoading}
                                    disabled={!username || !roomName}
                                    onClick={joinRoom}
                                >
                                    Create room
                                </LoadingButton>
                                <Typography
                                    variant='body2'
                                    color='GrayText'
                                    fontFamily='SFProText-Regular'
                                    textAlign='center'
                                >
                                    Before creating, make sure you have read our&nbsp;
                                    <Link>
                                        terms of service
                                    </Link>
                                    &nbsp;and agree to it
                                </Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
                <Typography
                    textAlign='center'
                    className='mt-5'
                >
                    Already have a room code?&nbsp;
                    <Link href='/'>
                        Join a room.
                    </Link>
                </Typography>
            </Stack>
            {!noFooter && <Footer />}
        </Box >
    )
}
