export default {
    createPost: (post) => {
        return fetch('/post/add', {
            method: 'POST',
            body: JSON.stringify({ postText: post }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => data)
    },
    getCurrentUserPosts: () => {
        return fetch('/post/myPosts').then(res => res.json())
            .then(data => data)
    },
    likeComment: (postID) => {
        return fetch('/post/likeComment', {
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
        return fetch('/post/unLikeComment', {
            method: 'POST',
            body: JSON.stringify({ postId: postID }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => data)
    }
}