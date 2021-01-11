import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import SideNav from 'parts/sideNav/sideNav'
import SideInfo from 'parts/sideInfo/sideInfo'
import Header from 'parts/header/header'

import Container from '@material-ui/core/Container'

import { items } from 'parts/sideNav/items'

const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '100vh',
        padding: theme.spacing(0, 10),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0, 0)
        },
    },
    content: {
        width: '50%',
        overflowY: 'auto',
        [theme.breakpoints.down('sm')]: {
            width: '85%'
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        }

    },
    sidebar: {
        height: '100%',
        maxWidth: '25%',
        width: '25%',
        backgroundColor: 'lightyellow',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            width: '15%'
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    sideInfo: {
        width: '25%',
        backgroundColor: 'lightgrey',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
}))

const UserLayout = (props) => {
    const classes = useStyle()
    const { children, location } = props
    const currentSelectedIndex = items.findIndex(item => item.path === location.pathname)
    const [selected, setSelected] = useState(currentSelectedIndex)
    return (
        <div className={classes.root} >
            <SideNav className={classes.sidebar} items={items} selected={selected} onClick={setSelected} />
            <div className={classes.content}>
                <Header title={items[selected].title} />
                {children}
            </div>
            <SideInfo className={classes.sideInfo} />
        </div>
    )
}
export default UserLayout