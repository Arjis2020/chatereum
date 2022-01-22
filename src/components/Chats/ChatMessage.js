import { Send } from '@mui/icons-material'
import { Avatar, Box, Button, Divider, FilledInput, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CloseIcon from '@mui/icons-material/Close';
import ModalComponent from '../Modal';
import Picker from 'emoji-picker-react'
import { AnimatePresence, motion } from 'framer-motion';

export default function ChatMessage({ onSendMessage, onTyping, onDismissTyping }) {

    const [message, setMessage] = useState('')
    const [emojiPicker, setEmojiPicker] = useState(false)

    const useStyles = makeStyles((theme) => ({
        message: {
            background: theme.palette.primary.darker,
        },
        input: {
            background: '#fff',
            //borderRadius: 5,
            //padding: 10,
        },
        button: {
            padding: 10,
            marginRight: 12
        }
    }))

    const classes = useStyles()

    const handleChange = (e) => {
        if (e.target.value)
            onTyping()
        else
            onDismissTyping()
        setMessage(e.target.value)
    }

    const sendMessage = () => {
        setMessage('')
        onDismissTyping()
        onSendMessage(message.trim())
    }

    const handleEmojiToggle = () => {
        setEmojiPicker(prevState => !prevState)
    }

    return (
        <Box>
            <AnimatePresence>
                {emojiPicker &&
                    <motion.div
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        exit={{
                            opacity: 0
                        }}
                        transition={{
                            duration: 0.2
                        }}
                    >
                        <Picker
                            onEmojiClick={(selected, { emoji }) => setMessage(prevMessage => prevMessage + emoji)}
                            //disableSkinTonePicker
                            native
                            pickerStyle={{
                                width: '100%'
                            }}
                        />
                    </motion.div>
                }
            </AnimatePresence>
            <TextField
                id='message-field'
                hiddenLabel
                multiline
                minRows={1}
                fullWidth
                maxRows={10}
                variant='filled'
                value={message}
                autoFocus
                onChange={handleChange}
                placeholder='Type a message'
                aria-label='message'
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault()
                        setEmojiPicker(false)
                        sendMessage()
                    }
                }}
                className={classes.input}
                InputProps={{
                    disableUnderline: true,
                    endAdornment:
                        <Stack
                            direction='row'
                            spacing={1}
                        >
                            <Button
                                variant='contained'
                                className={classes.button}
                                onClick={() => {
                                    setEmojiPicker(false)
                                    sendMessage()
                                }}
                                disabled={message.trim().length == 0}
                            >
                                <Send htmlColor='#fff' />
                            </Button>
                        </Stack>,
                    startAdornment:
                        <IconButton
                            color='primary'
                            onClick={handleEmojiToggle}
                            sx={{
                                mr: 2
                            }}
                        >
                            <EmojiEmotionsIcon />
                        </IconButton>
                }}
            />
        </Box>
    )
}
