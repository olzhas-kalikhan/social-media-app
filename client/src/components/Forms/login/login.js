import React, { useState, useContext } from 'react'
import { styles } from './styles'
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { AuthContext } from '../../../context/user/authContext'
import AuthService from '../../../services/auth/auth'

const Login = (props) => {
    const { classes } = props;
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
        console.log(form)
        AuthService.login(form).then(data => {

            const { isAuthenticated, user, message } = data
            if (isAuthenticated) {
                authContext.setUser(user)
                authContext.setIsAuthenticated(isAuthenticated)
                props.history.push('/home')
            }
            else{
                setMessage(message)
            }
        })

    }
    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
                className={classes.formElement}
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                onChange={handleEmailChange}

            />
            <TextField
                className={classes.formElement}
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                onChange={handlePasswordChange}
            />

            <Button
                className={classes.formElement}
                type="submit"
                variant="contained"
                color="primary"
            >
                Login
            </Button>


        </form>
    )
}

export default withStyles(styles)(Login)