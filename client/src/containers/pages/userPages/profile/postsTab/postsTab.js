import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useStyle } from './styles'
const PostsTab = (props) => {
    const classes = useStyle()
    return (

        <form className={classes.root}>
            <TextField
                id="newPost"
                className={classes.textArea}
                placeholder="New Post"
                multiline
            />
            <Button
                className={classes.submitButton}
                variant='contained'
                color='primary'
            >
                Post
            </Button>
        </form>

    )
}

export default PostsTab