import React, { useState } from 'react'
import { useStyles } from './styles'



import { Typography, FormControl, InputLabel, Input, Link, Button } from '@material-ui/core'

import AlertMessage from 'components/Alert'
import AuthService from 'services/auth'

const Register = (props) => {
    const { renderSignIn, history } = props
    const classes = useStyles()
    const [fieldsError, setFieldsError] = useState({
        email: false,
        name: false,
        password: false,
        confirmPassword: false
    })
    const [message, setMessage] = useState(null)
    const [form, setForm] = useState({
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
        setFieldsError(prevState => {
            let newState = prevState

            newState.email = form.email === ''
            newState.name = form.name === ''
            newState.password = form.password === ''
            newState.confirmPassword = form.confirmPassword === ''
            return newState
        })
        if (form.password !== form.confirmPassword)
            setMessage("Passwords don't match")

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
            <FormControl className={classes.formElement} error={fieldsError.email}>
                <InputLabel htmlFor="email-signup">Email</InputLabel>
                <Input id="email-signup" type="email" value={form.email} onChange={handleEmailChange} />
            </FormControl>
            <FormControl className={classes.formElement} error={fieldsError.name}>
                <InputLabel htmlFor="name-signup">Name</InputLabel>
                <Input id="name-signup" value={form.name} onChange={handleNameChange} />
            </FormControl>
            <FormControl className={classes.formElement} error={fieldsError.password}>
                <InputLabel htmlFor="password-signup">Password</InputLabel>
                <Input id="password-signup" type="password" value={form.password} onChange={handlePasswordChange} />
            </FormControl>
            <FormControl className={classes.formElement} error={fieldsError.confirmPassword}>
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
                Already have an account?
                <Link onClick={renderSignIn}> Login</Link>
            </Typography>


        </form>
    )
}

export default Register