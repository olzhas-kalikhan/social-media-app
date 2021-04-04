import React, { useState, useContext } from 'react'
import { styles } from './styles'
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link';


import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


import { AuthContext } from 'context/user/authContext'
import AuthService from 'services/auth/auth'
import { Typography } from '@material-ui/core';

const Login = (props) => {
    const { classes, history, renderSignUp } = props;
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
        AuthService.login(form)
            .then(data => {
                console.log(data)
                const { isAuthenticated, user, message } = data
                if (isAuthenticated) {
                    authContext.setUser(user)
                    authContext.setIsAuthenticated(isAuthenticated)
                    history.push('/home')
                }
                else {
                    setMessage(message);
                    console.log(message)
                }
            })
            .catch(err => { console.log(err.response) })
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


        </form>
    )
}

export default withStyles(styles)(Login)