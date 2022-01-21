import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles'
import { BeatLoader } from 'react-spinners'
import './chatbubble.css'
import { AnimatePresence, motion } from 'framer-motion';

export default function Typing({ username }) {

    const useStyles = makeStyles(theme => ({
        sender: {
            color: theme.palette.secondary.glow
        }
    }))

    const classes = useStyles()

    return (
        <motion.div
            initial={{
                y: 50,
                opacity: 0
            }}
            animate={{
                y: 0,
                opacity: 1
            }}
            exit={{
                y: 50,
                opacity: 0
            }}
            transition={{
                duration: 0.2
            }}

        >
            <div className='chat-container'>
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
                            {username}
                        </Typography>
                    </Stack>
                    <BeatLoader color='#FFF' size={10} />
                </Stack>
            </div>
        </motion.div>
    )
}
