import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        textDecoration: 'none',
        justifyContent: 'center ',
        color: "#3B5998"
    },
    listItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50px',
        width: '70%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },

    },
    selectedItem: {
        backgroundColor:'none',
        "&hover": {
            background: "none",
            color: "grey"
        },
    },
    listItemText: {
        textAlign: 'center',
        flex: '0.5 0.5',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    icon: {
        fontSize: '2rem',
        color: 'inherit',
        minWidth: '0'
    }
}))

const NavItem = (props) => {
    const { text, icon, path, onClick, index, selected } = props
    const classes = useStyles()
    return (
        <Link to={{ pathname: path }} className={classes.root}>


            <ListItem
                button
                alignItems='center'
                selected={selected === index}
                onClick={() => onClick(index)}
                classes={{ root: classes.listItem, selected: classes.selectedItem }}
            >
                <ListItemIcon classes={{ root: classes.icon }}>{icon({ fontSize: 'inherit' })}</ListItemIcon>
                <ListItemText
                    disableTypography
                    classes={{ root: classes.listItemText }}
                    primary={
                        <Typography variant='h5'>{text}</Typography>
                    }
                />
            </ListItem>


        </Link>
    )
}
export default NavItem