import React, { useState, useEffect } from 'react'
import PostService from 'services/postsService'
import PostItem from 'components/PostItem'
import CreatePost from 'components/CreatePost'

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
            <CreatePost onCreate={fetchPosts} />
            {posts.map((post, i) => (
                <PostItem post={post} key={post._id} refresh={fetchPosts} />
            ))}
        </div>
    )
}
export default HomePage