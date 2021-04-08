import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        backgroundColor: '#3B5998',
        color: '#FFFFFF',
        height: theme.spacing(7),
        minHeight: '5vh',
        alignItems: 'center'
    },
    navGrid: {
        margin: '0 auto',
        [theme.breakpoints.up('lg')]: {
            maxWidth: '1140px'
        }
    },
    searchBarLabel: {
        color: '#FFFFFF'
    },
    searchBar: {
        borderRadius: '30px',
        color: '#FFFFFF',

    },
    textField: {
        width: '100%',
        color: '#FFFFFF'
    }
}))

const Navbar = (props) => {
    const classes = useStyle()
    const { title } = props
    return (
        <div className={classes.root}>
            <Grid className={classes.navGrid} container justify="center" alignItems="center">
                <Grid item md={2}>
                    <Typography variant='h4'> {title.toUpperCase()} </Typography>
                </Grid>
                <Grid item md={4} />

            </Grid>

        </div>
    )
}
export default Navbar