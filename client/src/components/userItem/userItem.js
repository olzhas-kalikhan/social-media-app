import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
    },
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        margin: theme.spacing(0, 2)
    },
    followBtn: {
        justifySelf: 'flex-end'
    }
}))

const UserItem = (props) => {
    const classes = useStyles()
    const { user } = props
    const { name, email, profileImage } = user
    return (
        <ListItem className={classes.root}>
            <Avatar alt="Profile-Img"
                className={classes.avatar}
                src={profileImage}
            />
            <Typography variant='h6'>
                {name}
            </Typography>
            <Button className={classes.followBtn}>Follow</Button>
        </ListItem>
    )
}
export default UserItem