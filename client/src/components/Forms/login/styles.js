import { makeStyles } from '@material-ui/core/styles'
export const styles = ((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formElement: {
        marginBottom: theme.spacing(1.5),
        marginTop: theme.spacing(1.5),
        width: '70%',
    },
}));
