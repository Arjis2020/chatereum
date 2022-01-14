import React, { useState, useRef, useEffect } from 'react'
import { Container, Stack, Box, Avatar, Typography, IconButton, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem, Divider } from '@mui/material'
import { Call, VideoCall, MoreVert, Info, Cancel } from '@mui/icons-material'


export default function ChatHeader({ roomName, roomImg, participants }) {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <Box
            sx={{
                background: '#FCFCFC'
            }}
        >
            <Stack
                direction='row'
                justifyContent='space-between'
                padding={2}
            >
                <Stack
                    direction='row'
                    spacing={1}
                    alignItems='center'
                >
                    <Avatar
                        src={roomImg}
                        sx={{
                            height: 48,
                            width: 48
                        }}
                    />
                    <Stack
                        justifyContent='center'
                    >
                        <Typography
                            fontFamily='SFProText-Bold'
                            variant='h6'
                            noWrap
                        >
                            {roomName}
                        </Typography>
                        <Typography
                            variant='body2'
                            color='GrayText'
                            maxWidth='xs'
                            fontFamily='SFProText-Regular'
                        >
                            {participants} participants
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    direction='row'
                    spacing={1}
                >
                    <IconButton
                        color='primary'
                        ref={anchorRef}
                        aria-haspopup="true"
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleToggle}
                        sx={{
                            height: 50,
                            width: 50
                        }}
                    >
                        <MoreVert />
                    </IconButton>
                </Stack>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-end"
                    transition
                    style={{
                        zIndex: 2
                    }}
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <Stack
                                                direction='row'
                                                spacing={1}
                                                alignItems='center'
                                                justifyContent='center'
                                            >
                                                <Info color='info' />
                                                <Typography
                                                    variant='body1'
                                                >
                                                    Room info
                                                </Typography>
                                            </Stack>
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem onClick={handleClose}>
                                            <Stack
                                                direction='row'
                                                spacing={1}
                                                alignItems='center'
                                                justifyContent='center'
                                            >
                                                <Cancel color='error' />
                                                <Typography
                                                    variant='body1'
                                                >
                                                    Leave room
                                                </Typography>
                                            </Stack>
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Stack>
        </Box>
    )
}
