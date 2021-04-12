import React, { useState, useContext } from 'react'
import { useStyles } from './styles'

import { Button, Link, FormControl, Input, InputLabel, Typography } from '@material-ui/core'
import AlertMessage from 'components/Alert'
import { AuthContext } from 'context/user/authContext'
import AuthService from 'services/auth'


const Login = (props) => {
    const { history, renderSignUp } = props
    const classes = useStyles()
    const authContext = useContext(AuthContext)
    const [message, setMessage] = useState(null)
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const handleEmailChange = (e) => {
        setForm(prev => {
            return {
                ...prev,
                email: e.target.value
            }
        })
    }
    const handlePasswordChange = (e) => {
        setForm(prev => {
            return {
                ...prev,
                password: e.target.value
            }
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (form.email === '' || form.password === '')
            setMessage('Please enter email and password')
        else
            AuthService.login(form)
                .then(data => {
                    console.log(data, 'ccccccccc')

                    const { isAuthenticated, user, message } = data
                    if (isAuthenticated) {
                        authContext.setUser(user)
                        authContext.setIsAuthenticated(isAuthenticated)
                        history.push('/home')
                    }
                    else {
                        setMessage(message)
                        console.log(message, "message")
                    }

                })
                .catch(() => setMessage("Wrong email and password combination"))

    }
    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <Typography variant="h1">SIGN IN</Typography>
            <FormControl className={classes.formElement} error={message !== null}>
                <InputLabel htmlFor="email-login">Email</InputLabel>
                <Input id="email-login" type="email" value={form.email} onChange={handleEmailChange} />
            </FormControl>
            <FormControl className={classes.formElement} error={message !== null}>
                <InputLabel htmlFor="password-login">Password</InputLabel>
                <Input id="password-login" type="password" value={form.password} onChange={handlePasswordChange} />
            </FormControl>
            <div className={classes.formLinks}>
                <Link >Forgot Password?</Link>
                <Link onClick={renderSignUp}>Don't have an account yet?</Link>
            </div>
            <Button
                className={classes.formBtnSubmit}
                type="submit"
                variant="contained"
                color="primary"
            >
                <Typography variant="h3">
                    Login
                </Typography>
            </Button>
            <AlertMessage message={message} setMessage={setMessage} severity="error" />

        </form>
    )
}

export default Login