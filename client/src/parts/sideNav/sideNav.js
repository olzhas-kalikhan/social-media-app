import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'


import NavItem from './navItem'
import { makeStyles } from '@material-ui/core/styles'

const SideNav = (props) => {
    const { selected, onClick, items } = props
    return (
        <List className={props.className}>
            {items.map(({ title, icon, path }, i) =>
                <NavItem
                    index={i}
                    text={title}
                    icon={icon}
                    path={path}
                    selected={selected}
                    onClick={onClick}
                />
            )}
        </List>
    )
}
export default SideNav