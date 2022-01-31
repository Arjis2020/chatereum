import React from 'react';
import { Modal, Container, Box } from '@mui/material'

export default function ModalComponent({ open, onClose, children, sx }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={sx ? sx : {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                width: 'auto',
                p: 3,
            }}>
                {children}
            </Box>
        </Modal>
    )
}
