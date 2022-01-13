import { Call, VideoCall } from '@mui/icons-material'
import { Avatar, Box, Container, Divider, IconButton, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Footer from '../Footer'
import ChatArea from './ChatArea'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'

export default function Chat({ noFooter }) {
    const [room, setRoom] = useState({
        roomId: 'HEX67890',
        roomName: 'College Unofficial',
        participants: 0,
        roomImg: ''
    })

    const randomInRange = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    useEffect(() => {
        if (!room.roomImg)
            setRoom({ ...room, roomImg: `https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/${randomInRange(0, 100)}.png` })
    }, [])

    return (
        <>
            <Box
                sx={{
                    display: {
                        xs: 'none',
                        md: 'inline-block'
                    }
                }}
            >
                <Container
                    maxWidth='xl'
                    sx={{
                        display: 'flex',
                        height: '100vh',
                        width: '100vw',
                    }}
                >
                    <Stack
                        sx={{
                            width: '100%'
                        }}
                    >
                        <ChatHeader roomImg={room.roomImg} roomName={room.roomName} participants={room.participants} />
                        <Divider />
                        <ChatArea messages={[
                            {
                                sender: 'Arjis',
                                msg: 'Hello',
                                id: Math.random()
                            },
                            {
                                sender: 'Arjis',
                                msg: 'Hello',
                                id: Math.random()
                            },
                            {
                                sender: 'Arjis',
                                msg: 'Hello',
                                id: Math.random()
                            },
                            {
                                sender: 'Arjis',
                                msg: 'Hello',
                                id: Math.random()
                            },
                            {
                                sender: 'Arjis',
                                msg: 'Hello',
                                id: Math.random()
                            },
                            {
                                sender: 'Arjis',
                                msg: 'Hello',
                                id: Math.random()
                            },
                            {
                                sender: 'Arjis',
                                msg: 'Hello',
                                id: Math.random()
                            },
                            {
                                sender: 'Arjis',
                                msg: 'Hello',
                                id: Math.random()
                            },
                            {
                                sender: 'Arjis',
                                msg: 'Hello',
                                id: Math.random()
                            },
                            {
                                sender: 'Binit',
                                msg: 'Hello',
                                id: Math.random()
                            },
                        ]} />
                        <ChatMessage />
                    </Stack>
                </Container>
            </Box>
            <Box
                sx={{
                    display: {
                        xs: 'flex',
                        md: 'none'
                    }
                }}
            >
                <Container
                    sx={{
                        display: 'flex',
                        height: '100vh',
                    }}
                    disableGutters
                >
                    <Stack>
                        <ChatHeader roomImg={room.roomImg} roomName={room.roomName} participants={room.participants} />
                        <Divider />
                        <ChatArea messages={[
                            {
                                sender: 'Arjis',
                                msg: 'Hello',
                                id: Math.random()
                            },
                            {
                                sender: 'Arjis',
                                msg: 'Hello',
                                id: Math.random()
                            },
                            {
                                sender: 'Arjis',
                                msg: 'Hello',
                                id: Math.random()
                            },
                            {
                                sender: 'Arjis',
                                msg: 'Hello',
                                id: Math.random()
                            },
                            {
                                sender: 'Arjis',
                                msg: 'Hello',
                                id: Math.random()
                            },
                            {
                                sender: 'Arjis',
                                msg: 'Hello',
                                id: Math.random()
                            },
                            {
                                sender: 'Arjis',
                                msg: 'Hello',
                                id: Math.random()
                            },
                            {
                                sender: 'Arjis',
                                msg: 'Hello',
                                id: Math.random()
                            },
                            {
                                sender: 'Arjis',
                                msg: 'Hello',
                                id: Math.random()
                            },
                        ]} />
                        <ChatMessage />
                    </Stack>
                </Container>
            </Box>
            {!noFooter && <Footer />}
        </>
    )
}
