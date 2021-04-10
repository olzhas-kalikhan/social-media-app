import React, { useEffect, useState } from 'react'
import { useStyle } from './styles'
import PostService from 'services/posts/postsService'
import PostItem from 'components/postItem/postItem'
import CreatePost from 'components/CreatePost'

const PostsTab = (props) => {
    const classes = useStyle()
    const [message, setMessage] = useState(null)

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

    useEffect(fetchPosts, [])
    return (
        <>
            <CreatePost onCreate={fetchPosts} />
            <div className={classes.postList}>
                {posts.map((post, i) => (
                    <PostItem post={post} key={`post-${i}-${post.date}`} refresh={fetchPosts} />
                ))}
            </div>
            {message && <div>{message}</div>}
        </>
    )
}

export default PostsTab