import React, { useEffect, useState, useContext } from 'react'
import { Paper, Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { dateToString } from 'utils/dateUtils'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RepeatIcon from '@material-ui/icons/Repeat';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Avatar } from '@material-ui/core'
import PostService from 'services/posts/postsService'
import { AuthContext } from 'context/user/authContext'
const useStyle = makeStyles(theme => ({
    root: {
        width: '100%',
        WebkitBoxSizing: 'border-box',
        height: 'auto',
        padding: theme.spacing(2, 2, 1),
        backgroundColor: '#FFFFFF',
        borderTop: '2px solid #D0D0D0'
    },
    postContent: {
        width: '90%',
    },
    postInfoContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    postInfo: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        margin: '16px auto'
    },
    stats: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(1),
        alignItems: 'center',
        width: '60%'
    },
    statsBtn: {
        color: '#3B5998',
    }
}))

const PostItem = (props) => {
    const { post } = props
    const { user } = useContext(AuthContext)
    const classes = useStyle()
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(post.likes.length)
    const handleLikeIcon = () => {
        if (!liked)
            PostService.likeComment(post._id)
                .then(res => { setLiked(true); setLikes(likes + 1) })
        else
            PostService.unLikeComment(post._id)
                .then(res => { setLiked(false); setLikes(likes - 1) })
    }
    useEffect(() => {
        console.log(post.likes, user._id)
        setLiked(post.likes.includes(user._id))
    }, [post, user])
    return (
        <Grid container className={classes.root} key={post.date}>
            <Grid item xs={2} >
                <Avatar className={classes.avatar} src={post.postedBy.profileImage} />
            </Grid>
            <Grid item xs={10} className={classes.postInfoContainer}>
                <div className={classes.postContent}>
                    <Grid container className={classes.postInfo}>
                        <Grid item xs={3}>
                            <Typography variant='h5'>{post.postedBy.name}</Typography>
                        </Grid>
                        <Grid item xs={5} />

                        <Grid item xs={4}>
                            <Typography variant='subtitle1'>{dateToString(post.date)}</Typography>
                        </Grid>
                    </Grid>
                    <Typography variant='subtitle2'>{post.post}</Typography>
                </div>
                <div className={classes.stats}>
                    <Button className={classes.statsBtn} onClick={handleLikeIcon}>
                        {liked ?
                            <FavoriteIcon fontSize="small" /> :
                            <FavoriteBorderIcon fontSize="small" />}
                    </Button>
                    <Typography variant='caption'>{likes}</Typography>
                    <Button className={classes.statsBtn}><ChatBubbleOutlineIcon fontSize="small" /></Button>
                    <Typography variant='caption'>{post.comments.length}</Typography>

                    <Button className={classes.statsBtn}><RepeatIcon fontSize="small" /></Button>
                </div>
            </Grid>
        </Grid>
    )
}

export default PostItem