import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5000/';
export default {
    login: (user) => {
        return fetch('/user/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(data => data)
    },
    register: user => {
        return fetch('/user/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(data => data)
    },
    logout: () => {
        return fetch('/user/logout')
            .then(res => res.json()).then(data => data)
    },
    isAuthenticated: () => {
        return fetch('/user/authenticated')
            .then(res => {
                if (res.status !== 401)
                    return res.json().then(data => data)
                else
                    return { isAuthenticated: false, user: { email: "", name: "", role: "" } }
            })


    }
}