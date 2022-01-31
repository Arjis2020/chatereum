import React, { useState, useEffect } from 'react'
import { Chat, Lock, Person } from '@mui/icons-material'
import { Box, Card, CardContent, Link, Stack, TextField, Typography } from '@mui/material'
import Bubbles from './Bubbles'

import Model from './Model'
import { LoadingButton } from '@mui/lab'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom'

export default function Home({ noFooter, onJoinRoom }) {

    const [username, setUsername] = useState('')
    const [roomCode, setRoomCode] = useState('')
    const [isLoading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handleRoomCodeChange = (e) => {
        setRoomCode(e.target.value)
    }

    const onJoinClicked = () => {
        setLoading(true)
        onJoinRoom({
            room_code: roomCode,
            username,
            onSuccess: (data) => {
                navigate(data.navigate)
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
                    sx={{
                        minWidth: 'xs',
                        borderRadius: 2,

                    }}
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
                                    Welcome Back
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='GrayText'
                                    fontFamily='SFProText-Regular'
                                    maxWidth={350}
                                >
                                    Enter a Username and Room Code to get started
                                </Typography>
                            </Stack>
                            <TextField
                                label='Room Code'
                                placeholder='Enter room code'
                                value={roomCode}
                                onChange={handleRoomCodeChange}
                                type='text'
                                inputProps={{
                                    maxLength: 6
                                }}
                                required
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
                                    maxLength: 10
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <Person color='primary' />
                                    )
                                }}
                                fullWidth
                            />
                            <Stack
                                spacing={1}
                            >
                                <LoadingButton
                                    variant='contained'
                                    startIcon={<Lock />}
                                    fullWidth
                                    size='large'
                                    loading={isLoading}
                                    disabled={!username || !roomCode}
                                    onClick={onJoinClicked}
                                >
                                    Join room
                                </LoadingButton>
                                <Typography
                                    variant='body2'
                                    color='GrayText'
                                    fontFamily='SFProText-Regular'
                                    textAlign='center'
                                >
                                    Before joining, make sure you have read our&nbsp;
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
                    className='mt-4'
                >
                    Don't have a room code?&nbsp;
                    <Link href='/create'>
                        Create your own room.
                    </Link>
                </Typography>
            </Stack>
            {!noFooter && <Footer />}
        </Box>
    )
}
