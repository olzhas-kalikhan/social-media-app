import React, { useState, useEffect } from 'react'
import PostService from 'services/posts/postsService'
import PostItem from 'components/postItem/postItem'

const HomePage = () => {
    const [posts, setPosts] = useState([])

    const fetchPosts = () => {
        PostService.getAllPosts().then(data => {
            if (data.posts) {
                setPosts(data.posts)
            }
            else {
                console.log(data)
            }
        })
    }
    useEffect(fetchPosts, [])
    return (
        <div>
            {posts.map((post, i) => (
                <PostItem post={post} key={`post-${i}-${post.date}`} />
            ))}
        </div>
    )
}
export default HomePage