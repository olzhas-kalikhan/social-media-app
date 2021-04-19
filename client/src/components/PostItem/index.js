import React, { useContext } from 'react'
import { Grid, Typography, Avatar, } from '@material-ui/core'
import { useStyles } from './styles'

import { dateToString } from 'utils/dateUtils'



import DropdownMenu from 'components/DropdownMenu'
import ImagesContainer from 'components/ImagesContainer'
import FeedbackButtons from 'components/FeedbackButtons'
import PostService from 'services/postsService'
import { AuthContext } from 'context/user/authContext'

const PostItem = (props) => {
    const { post, comment, refresh } = props
    const { user } = useContext(AuthContext)
    const classes = useStyles()
    const menuItems = []
    const handleDeleteMenuItem = () => {
        PostService.deletePost(post)
            .then(res => { refresh() })
            .catch(err => console.log(err))
    }
    menuItems.push({
        title: 'Report',
        action: () => { alert('hi') }
    })
    if (user._id === post.postedBy._id)
        menuItems.push({
            title: 'Delete',
            action: handleDeleteMenuItem
        })

    return (

        <Grid container className={classes.root}>
            <Grid item xs={2} >
                <Avatar className={classes.avatar} src={post.postedBy.profileImage} />
            </Grid>
            <Grid item xs={10} >
                <div className={classes.postInfoContainer}>
                    <div className={classes.postContent}>
                        <div className={classes.postInfo}>
                            <Typography variant='h5'>{post.postedBy.name}</Typography>
                            <div className={classes.postInfo}>
                                <Typography variant='subtitle1'>{dateToString(post.date)}</Typography>
                                <DropdownMenu items={menuItems} />
                            </div>
                        </div>
                        <Typography variant='subtitle2'>{post.post}</Typography>
                    </div>
                    <ImagesContainer images={post.files} />
                    <FeedbackButtons post={post} comment={comment} />
                </div>
            </Grid>
        </Grid>

    )
}

export default PostItem