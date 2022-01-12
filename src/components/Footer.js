import { Favorite } from '@mui/icons-material'
import { Container, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

export default function Footer() {
    return (
        <Paper
            className='bottom-0 start-0 end-0 px-4'
            sx={{
                position: {
                    xs: 'relative',
                    md: 'fixed'
                },
                marginTop: {
                    xs: 5,
                    md: 'none'
                },
            }}
        >
            <Stack
                alignItems='center'
                justifyContent='space-between'
                padding={2}
                direction='row'
                sx={{
                    display: {
                        xs: 'none',
                        md: 'flex'
                    }
                }}
            >
                <Typography
                    variant='h6'
                >
                    Chatereum
                </Typography>
                <Stack
                    direction='row'
                    alignItems='center'
                    spacing={1}
                >
                    <Typography
                        variant='body2'
                        fontFamily='SFProText-Regular'
                        textAlign='center'
                        noWrap
                    >
                        Made with
                    </Typography>
                    <Favorite color='primary' fontSize='small' />
                    <Typography
                        variant='body2'
                        fontFamily='SFProText-Regular'
                        textAlign='center'
                        noWrap
                    >
                        by Arjis Chakraborty
                    </Typography>
                </Stack>
            </Stack>

            <Stack
                alignItems='center'
                justifyContent='space-between'
                padding={2}
                direction='column'
                spacing={1}
                sx={{
                    display: {
                        xs: 'flex',
                        md: 'none'
                    }
                }}
            >
                <Typography
                    variant='h6'
                >
                    Chatereum
                </Typography>
                <Stack
                    direction='row'
                    alignItems='center'
                    spacing={1}
                >
                    <Typography
                        variant='body2'
                        fontFamily='SFProText-Regular'
                        textAlign='center'
                        noWrap
                    >
                        Made with
                    </Typography>
                    <Favorite color='primary' fontSize='small' />
                    <Typography
                        variant='body2'
                        fontFamily='SFProText-Regular'
                        textAlign='center'
                        noWrap
                    >
                        by Arjis Chakraborty
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    )
}
