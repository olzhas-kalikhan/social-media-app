import { makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2, 2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    postList:{
        width:'90%',
    }
}))