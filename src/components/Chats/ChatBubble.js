import { Avatar, Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import './chatbubble.css'
import { motion } from 'framer-motion'

export default function ChatBubble({ sender, message, timestamp, className }) {

    const useStyles = makeStyles(theme => ({
        sender: {
            color: theme.palette.secondary.glow,
        },
        bubble: {
            background: theme.palette.primary.main,
        }
    }))

    const classes = useStyles()

    return (
        <Box>
            <motion.div
                initial={{
                    opacity: 0,
                    y: 50,
                    //width: '100vw'
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    //width: '100%'
                }}
                transition={{
                    duration: 0.2
                }}
            /* style={{
                maxWidth: '60%',
                width: 200
            }} */
            //className={`talk-bubble ${className ? 'tri-right' : null} round ${sender !== 'You' ? 'btm-left' : 'btm-right'} ${className ? 'mb-3' : null}`}
            //className='talk-bubble'
            >
                <Stack
                    className='chat-container'
                >
                    <Typography
                        variant='body2'
                        className={classes.sender}
                    >
                        {sender}
                    </Typography>
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
            </motion.div>
        </Box>
    )
}
