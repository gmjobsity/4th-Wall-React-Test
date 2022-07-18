import React, { FC, PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

interface IModalComponent {
  title: string;
  open: boolean;
  onClose?(): void;
}

const ModalComponent:FC<PropsWithChildren<IModalComponent>> = ({ children, title, open, onClose }) =>{
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="modal-modal-title" variant="h4" className="modal-title">{title}</Typography>
        {children}
      </Box>
    </Modal>
  );
}

export default ModalComponent;
