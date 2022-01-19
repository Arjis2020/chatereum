import { Avatar, Box, Divider, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import './chatbubble.css'

export default function ChatBubble({ sender, message, timestamp, className }) {

    const useStyles = makeStyles(theme => ({
        sender: {
            color: theme.palette.secondary.glow
        }
    }))

    const classes = useStyles()

    return (
        <Box>
            <div className={`talk-bubble ${className ? 'tri-right' : null} round ${sender !== 'You' ? 'btm-left' : 'btm-right'} ${className ? 'mb-3' : null}`}>
                <Stack
                    spacing={0.5}
                    className='talktext'
                >
                    <Stack
                        direction='row'
                        spacing={1}
                        alignItems='center'
                    >
                        <Typography
                            className={classes.sender}
                        >
                            {sender}
                        </Typography>
                    </Stack>
                    <Typography
                        variant='body2'
                        fontFamily='SFProText-Regular'
                    >
                        {message}
                    </Typography>
                    <Typography
                        variant='caption'
                        fontFamily='SFProText-Regular'
                        textAlign='end'
                    >
                        {moment(timestamp).format("hh:mm A")}
                    </Typography>
                </Stack>
            </div>
        </Box>
    )
}
