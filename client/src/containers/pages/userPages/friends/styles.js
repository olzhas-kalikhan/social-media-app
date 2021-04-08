import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        
    },
    searchBar: {
        width: '90%',
        WebkitBoxSizing: 'border-box',
        margin: theme.spacing(0, 4),
        padding: theme.spacing(1, 2),
        display: 'flex',
        alignItems: 'center',
        borderRadius: '50px',
        marginTop: theme.spacing(2)
    },
    inputField: {
        width: '100%',
    },
    submitBtn: {
        
    }
}))

export { useStyles }