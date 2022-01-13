import { Send } from '@mui/icons-material'
import { Avatar, Box, Button, Divider, FilledInput, IconButton, Stack, TextField } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'

export default function ChatMessage() {

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
                    //value='Hello'
                    autoFocus
                    placeholder='Type a message'
                    aria-label='message'
                    inputProps={{
                        className: classes.input
                    }}
                />
                <Button
                    variant='contained'
                    className={classes.button}
                    href='/'
                >
                    <Send htmlColor='#fff' />
                </Button>
            </Stack>
        </Box>
    )
}
