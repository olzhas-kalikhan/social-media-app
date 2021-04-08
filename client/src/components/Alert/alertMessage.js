import React, { useEffect, useState } from 'react';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, Collapse } from '@material-ui/core';
const AlertMessage = ({ severity, message, setMessage }) => {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setOpen(message !== null)
    }, [message])
    return (
        <Collapse in={open}>
            <Alert
                severity={severity}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                            setMessage(null)
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {message}
            </Alert>
        </Collapse>
    )
}
export default AlertMessage