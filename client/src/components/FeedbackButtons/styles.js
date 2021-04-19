import { makeStyles } from '@material-ui/core/styles'
export const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(1),
        alignItems: 'center',
        width: '60%'
    },
    statsBtn: {
        color: '#404040',
    }
}))

