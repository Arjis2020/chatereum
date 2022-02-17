import React, { useState, useEffect } from 'react'
import { Chat, Lock, Person } from '@mui/icons-material'
import { Avatar, Box, Card, CardContent, Link, Paper, Stack, TextField, Typography } from '@mui/material'
import Bubbles from '../Home/Bubbles'

import Model from '../Home/Model'
import { LoadingButton } from '@mui/lab'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom'

export default function UserDetails({ noFooter, onUserJoined, room_name, room_avatar, participants }) {

    const [username, setUsername] = useState('')
    const [isLoading, setLoading] = useState(false)

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const onJoinClicked = () => {
        setLoading(true)
        /*onUserJoined({
            room_code: roomCode,
            username,
            onSuccess: (data) => {
                navigate(data.navigate)
            }
        })*/
        onUserJoined(username, null)
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
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    justifyContent='center'
                                    spacing={1}
                                >
                                    <Avatar
                                        src={room_avatar}
                                        sx={{
                                            width: 50,
                                            height: 50
                                        }}
                                    />
                                    <Stack>
                                        <Typography
                                            variant='h4'
                                        >
                                            {room_name}
                                        </Typography>
                                        <Typography
                                            variant='body2'
                                            color='GrayText'
                                            marginLeft={0.7}
                                        >
                                            Chatereum room invite
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
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
                                    disabled={!username}
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
            </Stack>
            {!noFooter && <Footer />}
        </Box>
    )
}
