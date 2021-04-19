import React, { useState, useEffect, useContext } from 'react'
import { useStyles } from './styles';
import { Typography, Button, } from '@material-ui/core'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RepeatIcon from '@material-ui/icons/Repeat';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

import PostService from 'services/postsService'
import { AuthContext } from 'context/user/authContext'
import Modal from 'components/Modal'
import CommentSection from 'components/CommentSection'

const FeedbackButtons = ({ post, comment }) => {
    const classes = useStyles()
    const { user } = useContext(AuthContext)
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(post.likes.length)
    const [commentSectionOpen, setCommentSectionOpen] = useState(false)
    const handleLikeIcon = () => {
        if (!liked)
            PostService.likeComment(post._id)
                .then(res => { setLiked(true); setLikes(likes + 1) })
        else
            PostService.unLikeComment(post._id)
                .then(res => { setLiked(false); setLikes(likes - 1) })
    }
    const handleCommentSectionClose = () => {
        setCommentSectionOpen(false)
    }
    const handleCommentSectionOpen = () => {
        setCommentSectionOpen(true)
    }
    useEffect(() => {
        setLiked(post.likes.includes(user._id))
    }, [post, user])
    return (
        <>
            <div className={classes.root}>
                <div>
                    <Button className={classes.feedbackBtn} onClick={handleLikeIcon}>
                        {liked ?
                            <FavoriteIcon fontSize="small" /> :
                            <FavoriteBorderIcon fontSize="small" />}
                    </Button>
                    <Typography variant='caption'>{likes}</Typography>
                </div>
                {!comment &&
                    <>
                        <div>
                            <Button
                                className={classes.feedbackBtn}
                                onClick={handleCommentSectionOpen}
                            >
                                <ChatBubbleOutlineIcon fontSize="small" />
                            </Button>
                            <Typography variant='caption'>{post.replies.length}</Typography>
                        </div>
                        <Button className={classes.feedbackBtn}><RepeatIcon fontSize="small" /></Button>
                    </>
                }
            </div>
            <Modal
                open={commentSectionOpen}
                onClose={handleCommentSectionClose}
            >
                <CommentSection post={post} />
            </Modal>
        </>
    )
}

export default FeedbackButtons