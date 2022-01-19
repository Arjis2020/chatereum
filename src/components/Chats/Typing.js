import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles'
import { BeatLoader } from 'react-spinners'
import './chatbubble.css'

export default function Typing({ username }) {

    const useStyles = makeStyles(theme => ({
        sender: {
            color: theme.palette.secondary.glow
        }
    }))

    const classes = useStyles()

    return (
        <Box>
            <div className={`talk-bubble tri-right round btm-left mb-3`}>
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
                    <BeatLoader color='#FFF' size={10}/>
                </Stack>
            </div>
        </Box>
    )
}
