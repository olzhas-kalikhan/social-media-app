import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { dateToString } from 'utils/dateUtils'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RepeatIcon from '@material-ui/icons/Repeat';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Avatar } from '@material-ui/core'
const useStyle = makeStyles(theme => ({
    root: {
        width: '100%',
        WebkitBoxSizing: 'border-box',
        margin: theme.spacing(2, 0),
        height: 'auto',
        padding: theme.spacing(0.5, 2)
    },
    stats: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: theme.spacing(1)
    },
    postInfo: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    }

}))

const PostItem = (props) => {
    const { post } = props
    const classes = useStyle()
    return (
        <Paper className={classes.root} key={post.date}>
            <Avatar src={post.postedBy.profileImage} />
            <div>
                <div className={classes.postInfo}>
                    <Typography variant='subtitle1'>{post.postedBy.name}</Typography>
                    <Typography variant='subtitle2'>{dateToString(post.date)}</Typography>
                </div>
                <Typography>{post.post}</Typography>
                <div className={classes.stats}>
                    <Button><ChatBubbleOutlineIcon /></Button>
                    <Button><RepeatIcon /></Button>
                    <Button><FavoriteBorderIcon /></Button>
                </div>
            </div>
        </Paper>
    )
}

export default PostItem