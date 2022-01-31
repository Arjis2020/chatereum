import { Avatar, Box, Button, Card, CardContent, CircularProgress, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import './chatbubble.css'
import { motion } from 'framer-motion'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Download } from '@mui/icons-material'
import ReplyIcon from '@mui/icons-material/Reply';
import ModalComponent from '../Modal'

export default function ChatBubble({ sender, message, timestamp, metadata }) {
    const [url, setURL] = useState(null)
    const [viewImage, setViewImage] = useState(false)

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
        imgExpanded: {
            maxWidth: '80vw'
        }
    }))

    const handleImageClicked = () => {
        setViewImage(true)
    }

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
                maxWidth: metadata ? '100%' : '75%',
                overflowWrap: 'break-word',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            {
                metadata ?
                    sender === 'You' && metadata?.mime_type
                        &&
                        metadata?.mime_type && metadata?.mime_type.startsWith('image/')
                        ?
                        <>
                            {!url ?
                                <CircularProgress size={30} />
                                :
                                <IconButton
                                    sx={{
                                        '&:hover': {
                                            background: 'none'
                                        },
                                        backgroundColor: 'none'
                                    }}
                                    href={url}
                                    download={metadata?.name}
                                >
                                    <Avatar
                                        sx={{
                                            color: '#fff',
                                            background: '#4A4A4A',
                                            boxShadow: 4
                                        }}
                                    >
                                        <Download fontSize='small' />
                                    </Avatar>
                                </IconButton>
                            }
                        </>
                        :
                        null
                    :
                    null
            }
            <Stack>
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
                                    //spacing={0.5}
                                    background='#ECECEC'
                                >
                                    <div
                                        style={{
                                            background: '#000',
                                            borderRadius: 5,
                                            position: 'relative'
                                        }}
                                        className='my-2'
                                        onClick={() => handleImageClicked()}
                                    >
                                        <img
                                            src={message}
                                            className={`${classes.img} img`}
                                            style={{
                                                borderRadius: 5,
                                            }}
                                        />
                                    </div>
                                    <Typography
                                        variant='body2'
                                        fontFamily='SFProText-Regular'
                                    >
                                        {metadata?.caption}
                                    </Typography>
                                </Stack>
                                :
                                <Stack
                                //spacing={0.5}
                                >
                                    <Stack
                                        direction='row'
                                        justifyContent='space-between'
                                        alignItems='center'
                                        borderRadius={1}
                                        sx={{
                                            background: (theme) => theme.palette.primary.dark,
                                            p: 1,
                                        }}
                                    >
                                        <InsertDriveFileIcon
                                            color='inherit'
                                            fontSize='large'
                                        />
                                        <Typography
                                            variant='body2'
                                            fontFamily='SFProText-Regular'
                                            maxWidth={200}
                                            noWrap
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
                                                color='inherit'
                                                sx={{
                                                    border: '1px solid #fff',
                                                    borderRadius: '50%',
                                                    '&:hover': {
                                                        color: '#fff'
                                                    }
                                                }}
                                                size='small'
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
                </Stack>
                <Stack
                    direction='row'
                    spacing={1}
                    alignItems='center'
                    justifyContent='end'
                >
                    <Typography
                        variant='caption'
                        fontFamily='SFProText-Regular'
                        color='GrayText'
                        textAlign='end'
                    >
                        {moment(timestamp).format("hh:mm A")}
                    </Typography>
                    {sender === 'You' &&
                        <>
                            <Typography
                                variant='caption'
                                fontFamily='SFProText-Regular'
                                color='GrayText'
                                textAlign='end'
                            >
                                &bull;
                            </Typography>
                            <Typography
                                variant='caption'
                                fontFamily='SFProText-Medium'
                                color='GrayText'
                                textAlign='end'
                            >
                                Sent
                            </Typography>
                        </>
                    }
                </Stack>
            </Stack>
            {
                metadata ?
                    sender !== 'You' && metadata?.mime_type
                        &&
                        metadata?.mime_type && metadata?.mime_type.startsWith('image/')
                        ?
                        <Stack
                            direction='row'
                        >
                            <Stack
                                alignItems='center'
                                justifyContent='center'
                            >
                                {!url ?
                                    <CircularProgress size={30} />
                                    :
                                    <IconButton
                                        sx={{
                                            '&:hover': {
                                                background: 'none'
                                            },
                                            backgroundColor: 'none'
                                        }}
                                        href={url}
                                        download={metadata?.name}
                                    >
                                        <Avatar
                                            sx={{
                                                color: '#fff',
                                                background: '#4A4A4A',
                                                boxShadow: 4
                                            }}
                                        >
                                            <Download fontSize='small' />
                                        </Avatar>
                                    </IconButton>
                                }
                            </Stack>
                        </Stack>
                        :
                        null
                    :
                    null
            }
            {/* <Tooltip
                title='Share'
            >
                <IconButton
                    sx={{
                        height: 50,
                        width: 50
                    }}
                >
                    <ReplyIcon
                        sx={{
                            transform: 'scaleX(-1)'
                        }}
                    />
                </IconButton>
            </Tooltip> */}
            <ModalComponent
                open={viewImage}
                onClose={() => setViewImage(false)}
            >
                <Stack
                    spacing={5}
                >
                    <img
                        src={message}
                        className={classes.imgExpanded}
                    />
                    <Stack
                        spacing={1}
                    >
                        <Divider />
                        <Typography
                            //variant='body2'
                            color='GrayText'
                        >
                            {metadata?.caption}
                        </Typography>
                    </Stack>
                </Stack>
            </ModalComponent>
        </motion.div>
    )
}
