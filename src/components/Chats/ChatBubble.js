import { Avatar, Box, Card, CardContent, CircularProgress, Divider, IconButton, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import './chatbubble.css'
import { motion } from 'framer-motion'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Download } from '@mui/icons-material'

export default function ChatBubble({ sender, message, timestamp, metadata }) {
    const [url, setURL] = useState(null)

    const useStyles = makeStyles(theme => ({
        sender: {
            color: theme.palette.secondary.glow,
        },
        bubble: {
            background: theme.palette.primary.main,
        },
        img: {
            [theme.breakpoints.down('sm')]: {
                maxWidth: 280
            },
            [theme.breakpoints.up('sm')]: {
                maxWidth: '25vw'
            },
            transition: 'all 0.3s'
        },
    }))

    useEffect(() => {
        async function getURL() {
            let blob = message
            if (metadata) {
                blob = await base64ToBlob(blob)
                setURL(window.URL.createObjectURL(blob))
            }
        }
        if (!url && metadata) {
            getURL()
        }
    }, [])

    function base64ToBlob(base64) {
        return new Promise((resolve, reject) => {
            try {
                fetch(base64)
                    .then(response => response.blob())
                    .then(blob => resolve(blob))
            }
            catch (err) {
                reject(err)
            }
        })
    }

    const classes = useStyles()

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 50,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.2
            }}
            style={{
                maxWidth: '75%'
            }}
        >
            <Stack
                className='chat-container'
            >
                <Typography
                    variant='body2'
                    className={classes.sender}
                >
                    {sender}
                </Typography>
                {
                    metadata ?
                        metadata?.mime_type
                            &&
                            metadata?.mime_type.startsWith('image/') ?
                            <Stack
                                spacing={1}
                                background='#ECECEC'
                            >
                                <img
                                    src={message}
                                    style={{
                                        borderRadius: 5,
                                    }}
                                    className={`${classes.img} my-2 img`}
                                />
                                <Typography
                                    variant='body2'
                                    fontFamily='SFProText-Regular'
                                >
                                    {metadata?.caption}
                                </Typography>
                            </Stack>
                            :
                            <Stack
                                spacing={1}
                            >
                                <Stack
                                    direction='row'
                                    justifyContent='space-between'
                                    alignItems='center'
                                    borderRadius={1}
                                    sx={{
                                        background: '#ECECEC',
                                        p: 1,
                                    }}
                                >
                                    <InsertDriveFileIcon
                                        htmlColor='#BDBDBD'
                                        fontSize='large'
                                    />
                                    <Typography
                                        variant='body2'
                                        color='black'
                                        sx={{
                                            px: 2
                                        }}
                                    >
                                        {metadata?.name}
                                    </Typography>
                                    {!url ?
                                        <CircularProgress size={30} />
                                        :
                                        <IconButton
                                            color='default'
                                            sx={{
                                                border: '1px solid #000',
                                                borderRadius: '50%'
                                            }}
                                            href={url}
                                            download={metadata?.name}
                                        >
                                            <Download />
                                        </IconButton>
                                    }
                                </Stack>
                                <Typography
                                    variant='body2'
                                    fontFamily='SFProText-Regular'
                                >
                                    {metadata?.caption}
                                </Typography>
                            </Stack>
                        :
                        <Typography
                            variant='body2'
                            fontFamily='SFProText-Regular'
                        >
                            {message}
                        </Typography>
                }
                <Typography
                    variant='caption'
                    fontFamily='SFProText-Regular'
                    textAlign='end'
                >
                    {moment(timestamp).format("hh:mm A")}
                </Typography>
            </Stack>
        </motion.div>
    )
}
