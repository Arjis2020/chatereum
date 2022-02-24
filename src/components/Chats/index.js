import { Call, VideoCall } from '@mui/icons-material'
import { Avatar, Box, Card, Container, Divider, IconButton, Paper, Stack, Typography } from '@mui/material'
import axios from 'axios'
import Api from '../../api'
import React, { useEffect, useState } from 'react'
import Footer from '../Footer'
import ChatArea from './ChatArea'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import Loader from '../Loader'
import { v4 as uuidV4 } from 'uuid'
import Encryption from '@chatereum/react-e2ee'
import Review from '../Review'
import RoomDetails from './RoomDetails'
import UserDetails from './UserDetails'

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
    onUserDismissTyping,
    onLeaveRoom
}) {
    const location = useLocation()
    const [room, setRoom] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [isLoading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])
    const [typing, setTyping] = useState(null)
    const [hasLeft, setRoomLeft] = useState(false)
    const [username, setUsername] = useState(location.state?.username)

    const navigate = useNavigate()

    const scrollToBottom = () => {
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

    const sendMessage = (message) => {
        setMessages(oldMessages => [...oldMessages, {
            id: uuidV4(),
            sender: 'You',
            msg: message,
            timestamp: new Date().getTime()
        }])
        onSendMessage(message, room.participants)
        scrollToBottom()
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
        scrollToBottom()
    }

    const leaveRoom = () => {
        setLoading(true)
        onLeaveRoom(() => {
            setRoomLeft(true)
        })
        setTimeout(() => {
            setLoading(false)
        }, 0)
    }

    useEffect(() => {
        async function getRoomDetails() {
            try {
                var response = await axios.get(`${Api.ROOM_DETAILS}?room_code=${searchParams.get('room_code')}`)
                const { room } = response.data
                console.log(room)
                setRoom({
                    room_code: room.room_code,
                    size: 0,
                    participants: room.participants || [],
                    room_avatar: room.room_avatar,
                    room_name: room.room_name
                })
                if (username) {
                    onUserJoined(username, room)
                }
                setLoading(false)
            }
            catch (err) {
                console.log(err.toString())
            }
        }
        getRoomDetails()
        setTimeout(() => {
            document.getElementById('message-field')?.focus()
        }, 0)
        scrollToBottom()
    }, [])

    const onUserJoined = async (_username, _room) => {
        setLoading(true)
        if (!username)
            setUsername(_username)
        const keys = await Encryption.getKeys()
        sessionStorage.setItem('private_key', keys.private_key)
        onChatJoined({
            room_code: room ? room.room_code : _room.room_code,
            username: _username,
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
                scrollToBottom()
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
                scrollToBottom()
            }
        })
        onUserTyping({
            callback: ({ username }) => {
                setTyping(username)
                scrollToBottom()
            }
        })
        onUserDismissTyping({
            callback: () => {
                setTyping(null)
                scrollToBottom()
            }
        })
        setLoading(false)
    }

    return (
        isLoading ?
            <Loader />
            :
            <>
                {
                    !hasLeft ?
                        !username ?
                            <UserDetails
                                room_name={room.room_name}
                                room_avatar={room.room_avatar}
                                participants={room.participants}
                                onUserJoined={onUserJoined}
                            />
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
                                            overflow: 'hidden'
                                            //background: 'red'
                                        }}
                                    >
                                        <Stack
                                            direction='row'
                                            spacing={2}
                                            width='100%'
                                            //height='100%'
                                            justifyContent='space-evenly'
                                        >
                                            <RoomDetails room={room}/>
                                            <Stack
                                                sx={{
                                                    width: '100%',
                                                    boxShadow: 4
                                                }}
                                            >
                                                <ChatHeader
                                                    roomImg={room.room_avatar}
                                                    roomName={room.room_name}
                                                    participants={room.size}
                                                    onLeaveRoom={leaveRoom}
                                                />
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
                                            <ChatHeader
                                                roomImg={room.room_avatar}
                                                roomName={room.room_name}
                                                participants={room.size}
                                                onLeaveRoom={leaveRoom}
                                            />
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
                            </>
                        :
                        <Review />
                }
                {
                    !noFooter &&
                    <Footer />
                }
            </>
    )
}
