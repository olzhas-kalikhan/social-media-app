import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import SideNav from 'parts/SideNav'
import SideInfo from 'parts/SideInfo'
import Navbar from 'parts/Navbar'
import { Grid } from '@material-ui/core'

import { items } from 'parts/SideNav/items'

const useStyle = makeStyles(theme => ({
    root: {
        height: '95vh',
        maxHeight: '95vh',
        margin: '0 auto',
        [theme.breakpoints.up('lg')]: {
            maxWidth: '1140px'
        }
    },
    content: {
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        overflow: 'scroll',
        [theme.breakpoints.down('sm')]: {
            order: '2',
        },

    },
    sidebar: {
        height: '100%',
        width: '80%',
        display: 'flex',
        paddingTop: '50%',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        [theme.breakpoints.down('xs')]: {
            paddingTop: '0',
            flexDirection: 'row',
            order: '3',
            height: '10%',
        }
    },
    sideInfo: {
        width: '100%',
        height: '100%',
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
        <>
            <Navbar title={items[selected].title} />
            <Grid className={classes.root}
                container
                alignItems="stretch"
            >
                <Grid item md={3} xs={12}>
                    <SideNav className={classes.sidebar} items={items} selected={selected} onClick={setSelected} />
                </Grid>
                <Grid item md={6} xs={12} className={classes.content}>
                    {children}
                </Grid>
                <Grid item md={3}>
                    <SideInfo className={classes.sideInfo} />
                </Grid>
            </Grid>
        </>
    )
}
export default UserLayout