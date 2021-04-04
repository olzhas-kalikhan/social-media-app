import React, { useState } from 'react'
import { styles } from './styles'
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import Login from 'components/Forms/login/login'
import Register from 'components/Forms/login/register'
import Modal from 'containers/modal/modal'

const Welcome = (props) => {
    const { classes } = props

    const [signIn, setSignIn] = useState(true)
    const renderSignIn = () => setSignIn(true)
    const renderSignUp = () => setSignIn(false)


    return (
        <div className={classes.root}>
            <Grid
                container
            >
                <Grid item xs={12} sm={6}>

                </Grid>
                <Grid className={classes.menu} item xs={12} sm={6}>
                    {signIn ?
                        <Login history={props.history} renderSignUp={renderSignUp} /> :
                        <Register history={props.history} renderSignIn={renderSignIn} />
                    }
                </Grid>
            </Grid>


        </div>
    )
}
export default withStyles(styles)(Welcome)
//<Register history={props.history} />