import React from 'react'
import AuthService from 'services/auth'
import NavItem from './navItem'
import { Button } from '@material-ui/core'

const SideNav = (props) => {
    const { selected, onClick, items } = props
    const handleLogout = () => {
        AuthService.logout()
            .then(() => {
                window.location.reload();
            })
    }
    return (
        <div className={props.className}>

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

            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}
export default SideNav