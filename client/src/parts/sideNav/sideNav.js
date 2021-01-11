import React, { useContext, useCallback } from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import AuthService from 'services/auth/auth'
import { AuthContext } from 'context/user/authContext'

import NavItem from './navItem'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
const SideNav = (props) => {
    const { selected, onClick, items } = props
    const auth = useContext(AuthContext)
    const history = useHistory();

    const handleLogout = () => {
        AuthService.logout()
            .then(() => {
                window.location.reload();
            })
    }
    return (
        <div className={props.className}>
            <List>
                {items.map(({ title, icon, path }, i) =>
                    <NavItem
                        key={`Nav-${i}-${title}`}
                        index={i}
                        text={title}
                        icon={icon}
                        path={path}
                        selected={selected}
                        onClick={onClick}
                    />
                )}
            </List>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}
export default SideNav