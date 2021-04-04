import React, { useState, useContext } from 'react'
import { styles } from './styles'
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Typography, FormControl, InputLabel, Input, Link } from '@material-ui/core'

import AlertMessage from 'components/Alert/alertMessage'
import { AuthContext } from 'context/user/authContext'
import AuthService from 'services/auth/auth'

const Register = (props) => {
    const { classes, renderSignIn, history } = props;
    const authContext = useContext(AuthContext)
    const [message, setMessage] = useState(null)
    const [form, setForm] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const handleEmailChange = (e) => {
        setForm(prev => ({
            ...prev,
            email: e.target.value
        }))
    }
    const handlePasswordChange = (e) => {
        setForm(prev => ({
            ...prev,
            password: e.target.value
        }))
    }
    const handleUsernameChange = (e) => {
        setForm(prev => ({
            ...prev,
            username: e.target.value
        }))
    }
    const handleNameChange = (e) => {
        setForm(prev => ({
            ...prev,
            name: e.target.value
        }))
    }
    const handleConfirmPasswordChange = (e) => {
        setForm(prev => ({
            ...prev,
            confirmPassword: e.target.value
        }))
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        AuthService.register(form)
            .then(data => {
                console.log(data.status)
                if (data.status !== 'error')
                    history.push('/home')
                else
                    setMessage(data.message)
            })

    }
    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <Typography variant="h1">SIGN UP</Typography>
            <FormControl className={classes.formElement}>
                <InputLabel htmlFor="username-signup">Username</InputLabel>
                <Input id="username-signup" value={form.username} onChange={handleUsernameChange} />
            </FormControl>
            <FormControl className={classes.formElement}>
                <InputLabel htmlFor="email-signup">Email</InputLabel>
                <Input id="email-signup" type="email" value={form.email} onChange={handleEmailChange} />
            </FormControl>
            <FormControl className={classes.formElement}>
                <InputLabel htmlFor="name-signup">Name</InputLabel>
                <Input id="name-signup" value={form.name} onChange={handleNameChange} />
            </FormControl>
            <FormControl className={classes.formElement}>
                <InputLabel htmlFor="password-signup">Password</InputLabel>
                <Input id="password-signup" type="password" value={form.password} onChange={handlePasswordChange} />
            </FormControl>
            <FormControl className={classes.formElement}>
                <InputLabel htmlFor="confirm-password-signup">Confirm Password</InputLabel>
                <Input id="confirm-password-signup" type="password" value={form.confirmPassword} onChange={handleConfirmPasswordChange} />
            </FormControl>
            <AlertMessage message={message} setMessage={setMessage} severity="error" />
            <Button
                className={classes.formBtnSubmit}
                variant="contained"
                color="primary"
                type="submit"
            >
                <Typography variant="h3">
                    Sign Up
                </Typography>

            </Button>
            <Typography >
                Already have an account yet?
                <Link onClick={renderSignIn}> Login</Link>
            </Typography>


        </form>
    )
}

export default withStyles(styles)(Register)