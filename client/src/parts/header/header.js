import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: theme.spacing(7),
        minHeight: '40px',
        alignItems: 'center'
    }
}))

const Header = (props) => {
    const classes = useStyle()
    const { title } = props
    return (
        <div className={classes.root}>
            <Typography variant='h4'> {title.toUpperCase()} </Typography>
        </div>
    )
}
export default Header