import React, { useState } from 'react'
import { useStyles } from './styles'

import Grid from '@material-ui/core/Grid'

import Login from 'components/Forms/login/login'
import Register from 'components/Forms/login/register'

const Welcome = (props) => {
    const classes  = useStyles()

    const [signIn, setSignIn] = useState(true)
    const renderSignIn = () => setSignIn(true)
    const renderSignUp = () => setSignIn(false)


    return (
        <div className={classes.root}>
            <Grid
                container
                justify='center'
            >
         
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
export default Welcome
//<Register history={props.history} />