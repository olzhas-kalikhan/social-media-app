const postService = {
    createPost: (formdata) => {
        return fetch('/api/post/add', {
            method: 'POST',
            body: formdata,
        })
            .then(res => res.json())
            .then(data => data)
    },
    getAllPosts: () => {
        return fetch('/api/post/allPosts')
            .then(res => res.json())
            .then(data => data)
    },
    getReplies: (postId) => {
        return fetch(`/api/post/${postId}/replies`)
            .then(res => res.json())
            .then(data => data)
    },
    getCurrentUserPosts: () => {
        return fetch('/api/post/myPosts')
            .then(res => res.json())
            .then(data => data)
    },
    likeComment: (postID) => {
        return fetch('/api/post/likePost', {
            method: 'POST',
            body: JSON.stringify({ postId: postID }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => data)
    },
    unLikeComment: (postID) => {
        return fetch('/api/post/unLikePost', {
            method: 'POST',
            body: JSON.stringify({ postId: postID }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => data)
    },
    deletePost: (post) => {
        return fetch('/api/post/deletePost', {
            method: 'POST',
            body: JSON.stringify({ post: post }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => data)
    }
}
export default postService