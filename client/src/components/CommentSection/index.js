import React, { useEffect, useState } from 'react'
import CreatePost from 'components/CreatePost'
import PostService from 'services/postsService'
import PostItem from 'components/PostItem'

const CommentSection = ({ post }) => {
    const { _id } = post
    const [replies, setReplies] = useState([])
    const handleSubmit = (formdata) => {
        formdata.append('postId', _id)
        console.log(formdata)
    }
    const fetchReplies = () => {
        PostService.getReplies(_id)
            .then((res) => { setReplies(res.replies) })
            .catch(err => console.log(err))
    }
    useEffect(fetchReplies, [_id])
    return (
        <div>

            <CreatePost onSubmit={handleSubmit} onCreate={() => { }} />
            {replies && replies.map((reply, i) =>
                <div key={i}>

                    <PostItem post={reply} />
                </div>
            )}
        </div>
    )
}
export default CommentSection