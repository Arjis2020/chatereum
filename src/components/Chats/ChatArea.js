import { Lock } from '@mui/icons-material'
import { Box, Card, CardContent, Chip, Divider, Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import ChatBubble from './ChatBubble'

export default function ChatArea({ messages }) {
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
                    height: '100%',
                    width: '100%',
                }}
            >
                <Stack
                    alignItems='center'
                    spacing={2}
                    direction='column'
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
                        alignItems='start'
                    >
                        {messages && messages.map((message, index) => (
                            <ChatBubble
                                key={message.id}
                                sender={message.sender}
                                message={message.msg}
                                timestamp={new Date()}
                                className={message.sender !== messages[index + 1]?.sender}
                            />
                        ))}
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}
