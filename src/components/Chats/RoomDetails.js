import { Box, Container, Divider, Typography, Stack, Paper, IconButton, Avatar, TextField } from '@mui/material';
import { CopyAll, Share } from '@mui/icons-material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import './roomDetails.css'

export default function RoomDetails({ room }) {

    const useStyles = makeStyles((theme) => ({
        img: {
            width: "50%",
            borderRadius: "50%"
        }
    }))

    const classes = useStyles()

    return (
        <Box
            sx={{
                width: (theme) => theme.breakpoints.values.sm,
                //height: 'auto',
                overflow: 'auto',
                background: '#fff',
            }}
        >
            <Box
                className='room-status'
                sx={{
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant='caption'
                    color='white'
                >
                    Created by Arjis
                </Typography>
            </Box>
            <Box
                sx={{
                    py: 2,
                }}
            >
                <Container
                    maxWidth='xl'
                >
                    <Typography
                        variant='body2'
                        color='GrayText'
                    >
                        Room code
                    </Typography>
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
                                {room.room_code}
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
                    <Typography
                        variant='body2'
                        color='GrayText'
                        sx={{
                            mt: 4,
                        }}
                    >
                        Room image
                    </Typography>
                    <Paper
                        className='p-2 px-3'
                        sx={{
                            background: '#7B7CFF25',
                            boxShadow: 'none',
                            cursor: 'text',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onClick={() => {
                            /**
                             * @TODO
                             * show snackbar and also copy room code
                             */
                        }}
                    >
                        <img
                            src={room.room_avatar}
                            className={classes.img}
                        />
                    </Paper>
                    <TextField
                        maxRows={7}
                        label="Room description"
                        placeholder='Write a short description'
                        multiline
                        rows={7}
                        fullWidth
                        sx={{
                            mt: 2
                        }}
                    />
                    {/* <Typography
                        variant='body2'
                        color='GrayText'
                        sx={{
                            mt: 4,
                        }}
                    >
                        Participants
                    </Typography>
                    <Stack>
                        {room.participants.map(participant => (
                            <Paper
                                className='p-2 px-3 mt-2'
                                sx={{
                                    background: '#7B7CFF25',
                                    boxShadow: 'none',
                                    cursor: 'text'
                                }}
                                onClick={() => {
                                    
                    }}
                            >
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                    >
                        <Stack
                            direction='row'
                            spacing={1}
                            alignItems='center'
                        >
                            <Avatar
                                src='/logo512.png'
                                sx={{
                                    background: (theme) => theme.palette.primary.dark,
                                    p: 0.8
                                }}
                            />
                            <Stack>
                                <Typography
                                    variant='body1'
                                >
                                    {participant.username}
                                </Typography>
                                <Typography
                                    variant='caption'
                                    color='GrayText'
                                >
                                    A Chatereum user
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            direction='row'
                            alignItems='center'
                            justifyContent='space-between'
                        >
                            <IconButton>
                                <PersonRemoveIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Paper>
                        ))}
            </Stack> */}
        </Container>
            </Box >
        </Box >
    )
}
