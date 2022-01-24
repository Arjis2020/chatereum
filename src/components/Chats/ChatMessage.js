import { Send } from '@mui/icons-material'
import { Avatar, Box, Button, Divider, FilledInput, IconButton, Input, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { makeStyles, styled } from '@mui/styles'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CloseIcon from '@mui/icons-material/Close';
import ModalComponent from '../Modal';
import Picker from 'emoji-picker-react'
import { AnimatePresence, motion } from 'framer-motion';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Encryption from '../../encryption'

export default function ChatMessage({ onSendMessage, onSendFile, onTyping, onDismissTyping }) {

    const [message, setMessage] = useState('')
    const [emojiPicker, setEmojiPicker] = useState(false)
    const [modal, setModal] = useState({
        open: false,
        data: {
            mime_type: '',
            src: '',
            raw: new Uint8Array(),
            caption: '',
            name: ''
        }
    })

    const useStyles = makeStyles((theme) => ({
        message: {
            background: theme.palette.primary.darker,
        },
        input: {
            background: '#fff',
            //borderRadius: 5,
            //padding: 10,
        },
        button: {
            padding: 10,
            marginRight: 12
        },
        img: {
            [theme.breakpoints.down('sm')]: {
                maxWidth: 280
            },
            [theme.breakpoints.up('sm')]: {
                maxWidth: '50vw'
            },
            /* [theme.breakpoints.down('xl')] : {
                width: 280
            }, */
        },
        file: {
            [theme.breakpoints.down('sm')]: {
                width: 280,
                height: 280
            },
            [theme.breakpoints.up('sm')]: {
                width: '40vw',
                height: '40vh'
            },
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
        onDismissTyping()
        onSendMessage(message.trim())
        setMessage('')
    }

    const handleEmojiToggle = () => {
        setEmojiPicker(prevState => !prevState)
    }

    const Input = styled('input')({
        display: 'none',
    });

    const readFile = (event) => {
        const { target } = event
        if (target.files && target.files[0]) {
            console.log("FILES: ", target.files[0])
            var FR = new FileReader();
            /* FR.addEventListener("load", function (e) {
                const base_64 = e.target.result
                const mime_type = base_64.substring(0, base_64.indexOf(';')).split(':')[1]
                setModal({
                    open: true,
                    data: {
                        mime_type,
                        src: base_64,
                        caption: ''
                    }
                })
            }, true); */
            FR.addEventListener('loadend', async (e) => {
                const arrayBuffer = e.target.result
                var byteArray = new Uint8Array(arrayBuffer);
                var byteString = '';
                for (var i = 0; i < byteArray.byteLength; i++) {
                    byteString += String.fromCharCode(byteArray[i]);
                }
                var b64 = window.btoa(byteString);

                /*  var keys = await Encryption.getKeys()
                 var encrypted = await Encryption.encryptFile(keys.public_key, arrayBuffer)
                 var decrypted = await Encryption.decryptFile(encrypted.aes_key, encrypted.iv, keys.private_key, encrypted.cipher_buffer)
                 console.log("ENCRYPTED FILE : ", encrypted)
                 console.log("DECRYPTED FILE : ", decrypted) */

                //window.btoa(new Uint8Array(e.target.result)))
                //console.log("BASE64 : ", window.btoa(String.fromCharCode.apply(null, new Uint8Array(e.target.result))))
                setModal({
                    open: true,
                    data: {
                        mime_type: target.files[0].type,
                        src: `data:${target.files[0].type};base64,${b64}`,
                        raw: arrayBuffer,
                        caption: '',
                        name: target.files[0].name
                    }
                })
            })
            //FR.readAsDataURL(target.files[0]);
            FR.readAsArrayBuffer(target.files[0])
        }
    }

    const sendFile = () => {
        setMessage('')
        onSendFile({
            data: {
                raw: modal.data.raw,
                src: modal.data.src
            },
            metadata: {
                mime_type: modal.data.mime_type,
                caption: modal.data.caption,
                name: modal.data.name
            }
        })
        setModal({
            open: false,
            data: {
                mime_type: '',
                src: '',
                caption: ''
            }
        })
        setEmojiPicker(false)
    }

    return (
        <Box>
            {modal.open &&
                <ModalComponent
                    open={modal.open}
                    onClose={() => setModal({
                        open: false,
                        data: {
                            src: '',
                            mime_type: '',
                            raw: new Uint8Array(),
                            caption: ''
                        }
                    })}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            width: '100%',
                            height: '100%',
                            /* p: 3,
                            background: 'red' */
                        }}
                    >
                        {modal.data.mime_type?.startsWith('image/') ?
                            <Stack
                                alignItems='center'
                                justifyContent='center'
                                spacing={1}
                            >
                                <img src={modal.data.src} className={classes.img} />
                                <TextField
                                    label='Caption'
                                    value={modal.data.caption}
                                    onChange={(e) => setModal(prevModal => ({
                                        ...prevModal,
                                        data: {
                                            ...prevModal.data,
                                            caption: e.target.value
                                        }
                                    })
                                    )}
                                    variant='outlined'
                                    autoFocus
                                    multiline
                                    minRows={1}
                                    fullWidth
                                    maxRows={4}
                                    placeholder='Add a caption'
                                />
                                <Button
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                    startIcon={
                                        <Send />
                                    }
                                    onClick={sendFile}
                                >
                                    Send
                                </Button>
                            </Stack>
                            :
                            <Stack
                                spacing={1}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'gainsboro',
                                        //width: '100%',
                                        //height: '2vh'
                                    }}
                                    className={classes.file}
                                >
                                    <InsertDriveFileIcon
                                        htmlColor='#BDBDBD'
                                        fontSize='large'
                                    />
                                    <Typography
                                        variant='h6'
                                    >
                                        {modal.data.name}
                                    </Typography>
                                </Box>
                                <TextField
                                    label='Caption'
                                    value={modal.data.caption}
                                    onChange={(e) => setModal(prevModal => ({
                                        ...prevModal,
                                        data: {
                                            ...prevModal.data,
                                            caption: e.target.value
                                        }
                                    })
                                    )}
                                    variant='outlined'
                                    autoFocus
                                    multiline
                                    minRows={1}
                                    fullWidth
                                    maxRows={4}
                                    placeholder='Add a caption'
                                />
                                <Button
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                    startIcon={
                                        <Send />
                                    }
                                    onClick={sendFile}
                                >
                                    Send
                                </Button>
                            </Stack>
                        }
                    </Box>
                </ModalComponent>
            }
            <AnimatePresence>
                {emojiPicker &&
                    <div
                        style={{
                            background: '#fcfcfc'
                        }}
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 50
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            exit={{
                                opacity: 0,
                                y: 50
                            }}
                            transition={{
                                duration: 0.2
                            }}
                        >
                            <Picker
                                onEmojiClick={(selected, { emoji }) => setMessage(prevMessage => prevMessage + emoji)}
                                //disableSkinTonePicker
                                native
                                pickerStyle={{
                                    width: '100%'
                                }}
                            />
                        </motion.div>
                    </div>
                }
                {/*
                    modal.open &&
                    <motion.div
                        initial={{
                            y: 200
                        }}
                        animate={{
                            y: 0
                        }}
                        exit={{
                            y: 200
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                width: '100%',
                                height: '100%',
                                p: 3,
                                background: 'red'
                            }}
                        >
                            {modal.data.mime_type?.startsWith('image/') ?
                                <img src={modal.data.src} width={400} />
                                :
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'gainsboro',
                                        width: '100%',
                                        //height: '2vh'
                                    }}
                                >
                                    <InsertDriveFileIcon
                                        htmlColor='#BDBDBD'
                                        fontSize='large'
                                    />
                                </Box>
                            }
                        </Box>
                    </motion.div>
                    */
                }
            </AnimatePresence>
            <TextField
                id='message-field'
                hiddenLabel
                multiline
                minRows={1}
                fullWidth
                maxRows={7}
                variant='filled'
                value={message}
                autoFocus
                onChange={handleChange}
                placeholder='Type a message'
                aria-label='message'
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault()
                        setEmojiPicker(false)
                        sendMessage()
                    }
                }}
                className={classes.input}
                InputProps={{
                    disableUnderline: true,
                    endAdornment:
                        <Stack
                            direction='row'
                            spacing={1}
                        >
                            <label htmlFor='icon-button-file'>
                                <Input
                                    id="icon-button-file"
                                    accept="*"
                                    type="file"
                                    onChange={readFile}
                                />
                                <IconButton
                                    color='inherit'
                                    component="span"
                                >
                                    <AttachFileIcon />
                                </IconButton>
                            </label>
                            <Button
                                variant='contained'
                                className={classes.button}
                                onClick={() => {
                                    setEmojiPicker(false)
                                    sendMessage()
                                }}
                                disabled={message.trim().length === 0}
                            >
                                <Send htmlColor='#fff' />
                            </Button>
                        </Stack>,
                    startAdornment:
                        <IconButton
                            color='primary'
                            onClick={handleEmojiToggle}
                            sx={{
                                mr: 2
                            }}
                        >
                            <EmojiEmotionsIcon />
                        </IconButton>
                }}
            />
        </Box>
    )
}
