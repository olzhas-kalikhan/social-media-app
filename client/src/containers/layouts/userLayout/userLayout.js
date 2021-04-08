import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import SideNav from 'parts/sideNav/sideNav'
import SideInfo from 'parts/sideInfo/sideInfo'
import Navbar from 'parts/navbar/navbar'
import { Grid } from '@material-ui/core'

import { items } from 'parts/sideNav/items'

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
            width: '85%'
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        }

    },
    sidebar: {
        height: '100%',
        width: '100%',
        display: 'flex',
        paddingTop: '50%',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            width: '15%'
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none'
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
                <Grid item md={3}>
                    <SideNav className={classes.sidebar} items={items} selected={selected} onClick={setSelected} />
                </Grid>
                <Grid item md={6} className={classes.content}>
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