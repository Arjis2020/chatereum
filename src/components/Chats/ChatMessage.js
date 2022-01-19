import { Send } from '@mui/icons-material'
import { Avatar, Box, Button, Divider, FilledInput, IconButton, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'

export default function ChatMessage({ onSendMessage, onTyping, onDismissTyping }) {

    const [message, setMessage] = useState('')

    const useStyles = makeStyles((theme) => ({
        message: {
            background: theme.palette.primary.darker,
        },
        input: {
            background: '#fff',
            borderRadius: 5,
            padding: 10,
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
        onSendMessage(message)
    }

    return (
        <Box>
            <Stack
                direction='row'
                //spacing={2}
                className={classes.message}
                alignItems='center'
                justifyContent='stretch'
            >
                <FilledInput
                    disableUnderline
                    hiddenLabel
                    multiline
                    minRows={1}
                    fullWidth
                    maxRows={10}
                    value={message}
                    autoFocus
                    onChange={handleChange}
                    placeholder='Type a message'
                    aria-label='message'
                    inputProps={{
                        className: classes.input
                    }}
                />
                <Button
                    variant='contained'
                    className={classes.button}
                    onClick={sendMessage}
                >
                    <Send htmlColor='#fff' />
                </Button>
            </Stack>
        </Box>
    )
}
