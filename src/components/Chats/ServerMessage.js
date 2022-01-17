import { Box, Typography, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

export default function ServerMessage({ message }) {

    const useStyles = makeStyles((theme) => ({
        paper: {
            background: theme.palette.background.default,
        }
    })
    )

    const classes = useStyles()

    return (
        <Paper
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 1,
                width: 250
            }}
            className={classes.paper}
        >
            <Typography
                variant='body2'
                color='GrayText'
                noWrap
                maxWidth={80}
            >
                {message.substring(0, message.indexOf(' '))}&nbsp;
            </Typography>
            <Typography
                variant='body2'
                color='GrayText'
            >
                {message.substring(message.indexOf(' '))}
            </Typography>
        </Paper>
    )
}
