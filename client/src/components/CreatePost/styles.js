import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2, 2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    textArea: {
        width: '90%',
        margin: theme.spacing(1, 0)
    },
    submitButton: {
        alignSelf: 'flex-center',
        margin: theme.spacing(1, 5),
        width: '40%'
    }
}))
