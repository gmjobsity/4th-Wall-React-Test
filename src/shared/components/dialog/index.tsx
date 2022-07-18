import React, { FC, PropsWithChildren } from 'react';
import Typography from '@mui/material/Typography';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface IDialogComponent {
  title: string;
  content: string;
  okButtonText?: string;
  open: boolean;
  onOk?(): void;
  onClose?(): void;
}

const DialogComponent:FC<PropsWithChildren<IDialogComponent>> = ({ title, content, okButtonText = 'OK', open, onOk, onClose }) =>{
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Typography id="modal-modal-title" variant="h4">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onOk} autoFocus>
          {okButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogComponent;
