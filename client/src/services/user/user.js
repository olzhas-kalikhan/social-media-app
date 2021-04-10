const userService = {
    getFollowings: () => {
        return fetch('/api/user/following')
            .then(res => {
                if (res.status !== 401)
                    return res.json().then(data => data.following)
                else
                    return []
            })
    },
    searchUser: (query) => {
        return fetch('/api/user/search', {
            method: 'POST',
            body: JSON.stringify({ query }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => data)
    },
    uploadProfileImage: (formData) => {

        return fetch('/api/user/uploadProfileImage', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.error(err))
    }
}
export default userService