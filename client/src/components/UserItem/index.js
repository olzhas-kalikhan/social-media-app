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
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userInfo:{
        display:'flex',
        alignItems: 'center'
    },
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        margin: theme.spacing(0, 2)
    },
    followBtn: {
        border: '5px solid #011640',
        borderRadius: '50px',
        color: '#011640'
    }
}))

const UserItem = (props) => {
    const classes = useStyles()
    const { user } = props
    const { name, profileImage } = user
    return (
        <ListItem className={classes.root}>
            <div className={classes.userInfo}>
                <Avatar alt="Profile-Img"
                    className={classes.avatar}
                    src={profileImage}
                />

                <Typography variant='h5'>
                    {name}
                </Typography>
            </div>
            <Button className={classes.followBtn}>Add</Button>
        </ListItem>
    )
}
export default UserItem