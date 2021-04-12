import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2, 0),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#FFFFFF'
    },
    textArea: {
        width: '90%',
        margin: theme.spacing(1, 0)
    },
    submitButton: {
        width: '80%',
        borderRadius:'30px'
    }
}))
