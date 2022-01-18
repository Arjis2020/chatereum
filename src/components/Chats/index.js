import { Call, VideoCall } from '@mui/icons-material'
import { Avatar, Box, Card, Container, Divider, IconButton, Paper, Stack, Typography } from '@mui/material'
import axios from 'axios'
import Api from '../../api'
import React, { useEffect, useState } from 'react'
import Footer from '../Footer'
import ChatArea from './ChatArea'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import { useSearchParams } from 'react-router-dom'
import Loader from '../Loader'
import { v4 as uuidV4 } from 'uuid'
import Encryption from '../../encryption'

export default function Chat({ noFooter, onChatJoined }) {
    const [room, setRoom] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [isLoading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        async function getRoomDetails() {
            try {
                var response = await axios.get(`${Api.ROOM_DETAILS}?room_code=${searchParams.get('room_code')}`)
                const { room } = response.data
                setRoom({
                    room_code: room.room_code,
                    participants: 0,
                    room_avatar: room.room_avatar,
                    room_name: room.room_name
                })
                const keys = await Encryption.getKeys()
                console.log("KEYS", keys)
                const encoded = await Encryption.encrypt(keys.public_key, "Hello World")
                console.log("ENCRYPTED", encoded)
                const decrypted = await Encryption.decrypt(keys.private_key, encoded)
                console.log("DECRYPTED", decrypted)
                sessionStorage.setItem('private_key', keys.private_key)
                onChatJoined({
                    room_code: room.room_code,
                    username: searchParams.get('username'),
                    public_key: keys.public_key,
                    onSuccess: ({ message, sender, participants }) => {
                        setMessages(oldMessages => [...oldMessages, {
                            id: uuidV4(),
                            msg: message,
                            sender
                        }])
                        setRoom(oldRoom => ({
                            ...oldRoom,
                            participants
                        }))
                    }
                })
                setLoading(false)
            }
            catch (err) {
                console.log(err.toString())
            }
        }
        getRoomDetails()
    }, [])

    return (
        isLoading ?
            <Loader />
            :
            <>
                <Box
                    sx={{
                        display: {
                            xs: 'none',
                            md: 'inline-block'
                        },
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
                                width: '100%',
                                boxShadow: 4
                            }}
                        >
                            <ChatHeader roomImg={room.room_avatar} roomName={room.room_name} participants={room.participants} />
                            <Divider />
                            <ChatArea messages={messages} />
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
                            <ChatHeader roomImg={room.room_avatar} roomName={room.room_name} participants={room.participants} />
                            <Divider />
                            <ChatArea messages={messages} />
                            <ChatMessage />
                        </Stack>
                    </Container>
                </Box>
                {!noFooter && <Footer />}
            </>
    )
}
