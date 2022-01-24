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
import Encryption from '@chatereum/react-e2ee'

export default function Chat({
    noFooter,
    onChatJoined,
    onSendMessage,
    onSendFile,
    onMessageReceived,
    onFileReceived,
    onTyping,
    onUserTyping,
    onDismissTyping,
    onUserDismissTyping
}) {
    const [room, setRoom] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [isLoading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])
    const [typing, setTyping] = useState(null)

    const sendMessage = (message) => {
        setMessages(oldMessages => [...oldMessages, {
            id: uuidV4(),
            sender: 'You',
            msg: message,
            timestamp: new Date().getTime()
        }])
        onSendMessage(message, room.participants)
        setTimeout(() => {
            var div = document.getElementsByClassName('chat-area');
            for (let i = 0; i < div.length; i++) {
                //div.item(i).scrollTop = div.item(i).scrollHeight
                //div.item(i).scrollIntoView({ behavior: 'smooth' })
                div.item(i).scroll({
                    top: div.item(i).scrollHeight,
                    behavior: 'smooth'
                })
            }
        }, 0)
    }

    const sendFile = ({ data, metadata }) => {
        setMessages(oldMessages => [...oldMessages, {
            id: uuidV4(),
            sender: 'You',
            msg: data.src,
            metadata,
            timestamp: new Date().getTime()
        }])
        onSendFile({
            data: data.raw,
            metadata
        }, room.participants)
        setTimeout(() => {
            var div = document.getElementsByClassName('chat-area');
            for (let i = 0; i < div.length; i++) {
                //div.item(i).scrollTop = div.item(i).scrollHeight
                //div.item(i).scrollIntoView({ behavior: 'smooth' })
                div.item(i).scroll({
                    top: div.item(i).scrollHeight,
                    behavior: 'smooth'
                })
            }
        }, 0)
    }

    useEffect(() => {
        async function getRoomDetails() {
            try {
                var response = await axios.get(`${Api.ROOM_DETAILS}?room_code=${searchParams.get('room_code')}`)
                const { room } = response.data
                setRoom({
                    room_code: room.room_code,
                    size: 0,
                    participants: [],
                    room_avatar: room.room_avatar,
                    room_name: room.room_name
                })
                const keys = await Encryption.getKeys()
                sessionStorage.setItem('private_key', keys.private_key)
                onChatJoined({
                    room_code: room.room_code,
                    username: searchParams.get('username'),
                    public_key: keys.public_key,
                    onSuccess: ({ message, sender, participants, size }) => {
                        //console.log("PARTICIPANTS : ", participants)
                        setMessages(oldMessages => [...oldMessages, {
                            id: uuidV4(),
                            msg: message,
                            sender,
                            timestamp: new Date().getTime()
                        }])
                        setRoom(oldRoom => ({
                            ...oldRoom,
                            size,
                            participants
                        }))
                    }
                })
                onMessageReceived({
                    callback: ({ message, sender, timestamp }) => {
                        setMessages(oldMessages => [...oldMessages, {
                            id: uuidV4(),
                            msg: message,
                            sender,
                            timestamp
                        }])
                        setTimeout(() => {
                            var div = document.getElementsByClassName('chat-area');
                            for (let i = 0; i < div.length; i++) {
                                //div.item(i).scrollTop = div.item(i).scrollHeight
                                //div.item(i).scrollIntoView({ behavior: 'smooth' })
                                div.item(i).scroll({
                                    top: div.item(i).scrollHeight,
                                    behavior: 'smooth'
                                })
                            }
                        }, 0)
                    }
                })
                onFileReceived({
                    callback: ({ data, sender, timestamp, metadata }) => {
                        const arrayBuffer = data
                        var byteArray = new Uint8Array(arrayBuffer);
                        var byteString = '';
                        for (var i = 0; i < byteArray.byteLength; i++) {
                            byteString += String.fromCharCode(byteArray[i]);
                        }
                        var b64 = window.btoa(byteString);

                        setMessages(oldMessages => [...oldMessages, {
                            id: uuidV4(),
                            msg: `data:${metadata.mime_type};base64,${b64}`,
                            metadata,
                            sender,
                            timestamp
                        }])
                        setTimeout(() => {
                            var div = document.getElementsByClassName('chat-area');
                            for (let i = 0; i < div.length; i++) {
                                //div.item(i).scrollTop = div.item(i).scrollHeight
                                //div.item(i).scrollIntoView({ behavior: 'smooth' })
                                div.item(i).scroll({
                                    top: div.item(i).scrollHeight,
                                    behavior: 'smooth'
                                })
                            }
                        }, 0)
                    }
                })
                onUserTyping({
                    callback: ({ username }) => {
                        setTyping(username)
                    }
                })
                onUserDismissTyping({
                    callback: () => {
                        setTyping(null)
                    }
                })
                setLoading(false)
            }
            catch (err) {
                console.log(err.toString())
            }
        }
        getRoomDetails()
        setTimeout(() => {
            document.getElementById('message-field').focus()
        }, 0)
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
                            <ChatHeader roomImg={room.room_avatar} roomName={room.room_name} participants={room.size} />
                            <Divider />
                            <div
                                className='chat-area'
                                style={{
                                    background: '#FCFCFC',
                                    overflow: 'hidden auto',
                                    height: '100%'
                                }}
                            >
                                <ChatArea
                                    messages={messages}
                                    typing={typing}
                                />
                            </div>
                            <ChatMessage
                                onSendMessage={sendMessage}
                                onSendFile={sendFile}
                                onTyping={() => onTyping(room.room_code)}
                                onDismissTyping={() => onDismissTyping(room.room_code)}
                            />
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
                            width: '100vw',
                        }}
                        disableGutters
                    >
                        <Stack
                            sx={{
                                width: '100%',
                                //boxShadow: 4
                            }}
                        >
                            <ChatHeader roomImg={room.room_avatar} roomName={room.room_name} participants={room.size} />
                            <Divider />
                            <div
                                className='chat-area'
                                style={{
                                    background: '#FCFCFC',
                                    overflow: 'hidden auto',
                                    height: '100%'
                                }}
                            >
                                <ChatArea
                                    messages={messages}
                                    typing={typing}
                                />
                            </div>
                            <ChatMessage
                                onSendMessage={sendMessage}
                                onSendFile={sendFile}
                                onTyping={() => onTyping(room.room_code)}
                                onDismissTyping={() => onDismissTyping(room.room_code)}
                            />
                        </Stack>
                    </Container>
                </Box>
                {!noFooter && <Footer />}
            </>
    )
}
