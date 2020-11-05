import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from 'context/user/authContext'
const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const { isAuthenticated, user } = useContext(AuthContext)
    return (
        <Route {...rest} render={props => {
            if (!isAuthenticated)
                return <Redirect to={{ pathname: '/', state: { from: props.location } }} />

            console.log(user.role)
            if (!roles.includes(user.role))
                return <Redirect to={{ pathname: '/profile', state: { from: props.location } }} />
            return <Component {...props} />
        }}>

        </Route>
    )
}
export default PrivateRoute