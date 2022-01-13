import React from 'react'
import { Container, Stack, Box, Avatar, Typography, IconButton } from '@mui/material'
import { Call, VideoCall } from '@mui/icons-material'


export default function ChatHeader({ roomName, roomImg, participants }) {
    return (
        <Box
            sx={{
                background: '#FCFCFC'
            }}
        >
            <Stack
                direction='row'
                justifyContent='space-between'
                padding={2}
            >
                <Stack
                    direction='row'
                    spacing={1}
                    alignItems='center'
                >
                    <Avatar
                        src={roomImg}
                        sx={{
                            height: 48,
                            width: 48
                        }}
                    />
                    <Stack
                        justifyContent='center'
                    >
                        <Typography
                            fontFamily='SFProText-Bold'
                            variant='h6'
                            noWrap
                        >
                            {roomName}
                        </Typography>
                        <Typography
                            variant='body2'
                            color='GrayText'
                            fontFamily='SFProText-Regular'
                        >
                            {participants} participants
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    direction='row'
                    spacing={1}
                >
                    <IconButton
                        color='primary'
                    >
                        <Call />
                    </IconButton>
                    <IconButton
                        color='primary'
                    >
                        <VideoCall />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    )
}
