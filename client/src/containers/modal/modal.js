import React from 'react'
import { makeStyles } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    title: {
        textAlign: 'center'
    }
}))

const Modal = (props) => {
    const { title, children, open, onClose } = props
    const classes = useStyles()
    return (
        <Dialog
            classes={{ paper: classes.root }}
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth='sm'
        >
            <DialogTitle className={classes.title}>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    )
}
export default Modal