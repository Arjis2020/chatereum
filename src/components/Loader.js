import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import Bubbles from './Home/Bubbles'

export default function Loader() {
    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    zIndex: -1,
                    left: 0,
                    right: 0,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Bubbles />
            </Box>
            <CircularProgress variant='indeterminate' size={30} thickness={8} />
        </div>
    )
}
