import { makeStyles } from '@material-ui/core/styles'
export const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        padding: theme.spacing(0),
        paddingRight: theme.spacing(3)
    },

    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        margin: 'auto'
    }

}))

