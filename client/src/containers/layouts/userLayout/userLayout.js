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
        height: '100vh'
    },
    content: {
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            width:'85%'
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        }
    },
    sidebar: {
        height: '100%',
        maxWidth: '25%',
        width: '25%',

        [theme.breakpoints.down('sm')]: {
            width:'15%'
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
    const { children, title } = props
    const [selected, setSelected] = useState(0)
    return (
        <Container className={classes.root} fluid>
            <SideNav className={classes.sidebar} items={items} selected={selected} onClick={setSelected} />
            <div className={classes.content}>
                <Header title={items[selected].title} />
                {children}
            </div>
            <SideInfo className={classes.sideInfo} />
        </Container>
    )
}
export default UserLayout