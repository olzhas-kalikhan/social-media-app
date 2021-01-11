import React, { useState, useContext } from 'react'
import { styles } from './styles'
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { AuthContext } from 'context/user/authContext'
import AuthService from 'services/auth/auth'

const Register = (props) => {
    const { classes } = props;
    const authContext = useContext(AuthContext)
    const [message, setMessage] = useState(null)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
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
    const handleSubmit = async (event) => {
        event.preventDefault()
        AuthService.register(form).then(data => {
            console.log(data)
        })

    }
    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
                className={classes.formElement}
                id="name"
                label="name"
                type="text"
                variant="outlined"
                onChange={handleNameChange}
            />
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
            <TextField
                className={classes.formElement}
                id="confirmPassword"
                label="confirmPassword"
                type="password"
                variant="outlined"
            />
            <Button
                className={classes.formElement}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                SignUp
            </Button>


        </form>
    )
}

export default withStyles(styles)(Register)