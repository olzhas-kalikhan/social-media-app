import { makeStyles } from '@material-ui/core/styles'
export const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    formElement: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
        width: '50%',

        [theme.breakpoints.down('md')]: {
            width: '70%',
        }
    },
    formBtnSubmit: {
        marginTop: theme.spacing(2),
        width: '20%',
        borderRadius: theme.spacing(1.5),
        [theme.breakpoints.down('md')]: {
            width: '50%',
        }
    },
    formLinks: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '50%',
        [theme.breakpoints.down('md')]: {
            width: '70%',
            flexDirection: 'column'
        },
        '&:hover': {
            cursor: 'pointer'
        }
    },
}))
