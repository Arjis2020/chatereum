import React from 'react';
import {Modal, Container} from '@mui/material'

export default function ModalComponent({open, onClose, children}) {
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Container maxWidth='xl' sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                width: 'auto',
                p: 3,
            }}>
                {children}
            </Container>
        </Modal>
    )
}
