import { Favorite } from '@mui/icons-material'
import { Container, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

export default function Footer() {
    return (
        <Paper
            className='position-fixed bottom-0 start-0 end-0'
        >
            <Container
                maxWidth='xl'
                disableGutters
            >
                <Stack
                    alignItems='center'
                    justifyContent='space-between'
                    direction='row'
                    padding={2}
                >
                    <Typography
                        variant='h6'
                    >
                        Chatereum
                    </Typography>
                    <Typography
                        variant='body2'
                        fontFamily='SFProText-Regular'
                    >
                        Made with&nbsp;
                        <Favorite color='primary' fontSize='small'/>
                        &nbsp;by Arjis Chakraborty
                    </Typography>
                </Stack>
            </Container>
        </Paper>
    )
}
