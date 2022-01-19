import { Lock } from '@mui/icons-material'
import { Box, Card, CardContent, Chip, Divider, Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import ChatBubble from './ChatBubble'
import ServerMessage from './ServerMessage'
import Typing from './Typing'

export default function ChatArea({ messages, typing }) {
    return (
        <Box
            sx={{
                background: '#FCFCFC',
                overflow: 'hidden auto',
                p: 2
            }}
        >
            <Box
                className='mb-2'
                sx={{
                    height: '100vh',
                    width: '100%',
                    justifyContent: 'center',
                    display: 'flex'
                }}
            >
                <Stack
                    alignItems='center'
                    spacing={2}
                    direction='column'
                    sx={{
                        width: '100vw',
                    }}
                >
                    <Card
                        sx={{
                            maxWidth: 400,
                            background: '#000'
                        }}
                    >
                        <CardContent>
                            <Stack
                                direction='row'
                                alignItems='flex-start'
                                spacing={1}
                            >
                                <Lock color='secondary' sx={{
                                    height: 15,
                                    width: 15
                                }} />
                                <Typography
                                    variant='body2'
                                    color='secondary'
                                    textAlign='start'
                                >
                                    End-to-end encryption is now active which means no one except the people in the room have access to what you are sending. No, not even Chatereum has any idea what you are sending in a room.
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Stack
                        direction='column'
                        spacing={1}
                        alignItems='center'
                        sx={{
                            width: '100%'
                        }}
                    >
                        {messages && messages.map((message, index) => (
                            message.sender && message.sender === 'Server' ?
                                <ServerMessage
                                    key={message.id}
                                    message={message.msg}
                                />
                                :
                                message.sender &&
                                <Box
                                    justifyContent={message.sender !== 'You' ? 'start' : 'end'}
                                    display='flex'
                                    flex={1}
                                    sx={{
                                        width: '100%'
                                    }}
                                >
                                    <ChatBubble
                                        key={message.id}
                                        sender={message.sender}
                                        message={message.msg}
                                        timestamp={message.timestamp}
                                        className={message.sender !== messages[index + 1]?.sender}
                                    />
                                </Box>
                        ))}
                        {
                            typing &&
                            <Box
                                justifyContent='start'
                                display='flex'
                                flex={1}
                                sx={{
                                    width: '100%'
                                }}
                            >
                                <Typing
                                    username={typing}
                                />
                            </Box>
                        }
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}
