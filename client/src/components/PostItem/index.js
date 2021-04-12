import React, { useEffect, useState, useContext } from 'react'
import { Grid, Typography, Button, Avatar, Menu, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { dateToString } from 'utils/dateUtils'
import Modal from 'components/Modal'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RepeatIcon from '@material-ui/icons/Repeat';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import PostService from 'services/postsService'
import { AuthContext } from 'context/user/authContext'
const useStyle = makeStyles(theme => ({
    root: {
        width: '100%',
        WebkitBoxSizing: 'border-box',
        height: 'auto',
        padding: theme.spacing(2, 0, 1),
        backgroundColor: '#FFFFFF',
        borderTop: '2px solid #D0D0D0'
    },
    postContent: {
        width: '90%',
    },
    postImage: {
        width: '90%'
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
        color: '#404040',
    }
}))

const PostItem = (props) => {
    const { post, refresh } = props
    const { user } = useContext(AuthContext)
    const classes = useStyle()
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(post.likes.length)
    const [imageModal, setImageModal] = useState(false)
    const [currentImage, setCurrentImage] = useState("")
    const [menuElAnchor, setMenuElAnchor] = React.useState(null);

    const handleMenuClick = (event) => {
        setMenuElAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setMenuElAnchor(null);
    };
    const handleLikeIcon = () => {
        if (!liked)
            PostService.likeComment(post._id)
                .then(res => { setLiked(true); setLikes(likes + 1) })
        else
            PostService.unLikeComment(post._id)
                .then(res => { setLiked(false); setLikes(likes - 1) })
    }
    const gridWidth = (length) => {
        if (length === 1) return 12
        if (length === 2) return 6
        if (length === 3) return 4
        return 3
    }
    const handleImageClick = (file) => {
        setCurrentImage(file)
        setImageModal(true)
    }
    const handleModalClose = () => {
        setImageModal(false)
    }
    const handleDeleteMenuItem = () => {
        PostService.deletePost(post)
            .then(res => { refresh() })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        setLiked(post.likes.includes(user._id))
    }, [post, user])
    return (

        <Grid container className={classes.root}>
            <Grid item xs={2} >
                <Avatar className={classes.avatar} src={post.postedBy.profileImage} />
            </Grid>
            <Grid item xs={10} className={classes.postInfoContainer}>
                <div className={classes.postContent}>
                    <Grid container className={classes.postInfo}>
                        <Grid item xs={8}>
                            <Typography variant='h5'>{post.postedBy.name}</Typography>
                        </Grid>
                    

                        <Grid item xs={4} container alignItems='center'>

                            <Grid item xs={10}>
                                <Typography variant='subtitle1'>{dateToString(post.date)}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    onClick={handleMenuClick}
                                >
                                    <MoreVertIcon />
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    keepMounted
                                    anchorEl={menuElAnchor}
                                    open={Boolean(menuElAnchor)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Report</MenuItem>
                                    {user._id === post.postedBy._id && <MenuItem onClick={handleDeleteMenuItem}>Delete</MenuItem>}
                                </Menu>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Typography variant='subtitle2'>{post.post}</Typography>
                </div>
                {post.files.length > 0 &&
                    <Grid container>

                        {post.files.map((file, i, files) => <Grid item xs={gridWidth(files.length)} key={file}> <img alt="post attached images" className={classes.postImage} src={file} onClick={() => handleImageClick(file)} /></Grid>)}
                    </Grid>
                }
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
            <Modal open={imageModal} onClose={handleModalClose}><img alt="post attached images" src={currentImage} className={classes.postImage} /></Modal>
        </Grid>

    )
}

export default PostItem