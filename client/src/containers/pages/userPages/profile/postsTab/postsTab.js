import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useStyle } from './styles'
import PostService from 'services/posts/postsService'
import PostItem from 'components/postItem/postItem'
const PostsTab = (props) => {
    const classes = useStyle()
    const [message, setMessage] = useState(null)
    const [post, setPost] = useState('')
    const [posts, setPosts] = useState([])
    const fetchPosts = () => {
        PostService.getCurrentUserPosts().then(data => {
            if (data.posts) {
                setPosts(data.posts)
            }
            else {
                console.log(data)
                setMessage(data)
            }
        })
    }
    const handlePostChange = (event) => {
        setPost(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        PostService.createPost(post).then(data => {
            console.log(data)
            fetchPosts()
        })
    }
    useEffect(fetchPosts, [])
    return (
        <>
            <form className={classes.root} onSubmit={handleSubmit}>
                <TextField
                    id="newPost"
                    className={classes.textArea}
                    onChange={handlePostChange}
                    placeholder="New Post"
                    multiline
                />
                <Button
                    className={classes.submitButton}
                    variant='contained'
                    color='primary'
                    type='submit'
                >
                    Post
            </Button>
            </form>
            <div className={classes.postList}>
                {posts.map((post, i) => (
                    <PostItem post={post} key={`post-${i}-${post.date}`} />
                ))}
            </div>
            {message && <div>{message}</div>}
        </>
    )
}

export default PostsTab