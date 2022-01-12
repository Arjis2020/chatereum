import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'

export default function Header() {
    return (
        <AppBar
            position='fixed'
            color='inherit'
        >
            <Toolbar>
                <Typography variant='button' fontWeight='bold'>
                    PoppyPulse
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
