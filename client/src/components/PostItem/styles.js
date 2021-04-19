import { makeStyles } from '@material-ui/core/styles'
export const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        WebkitBoxSizing: 'border-box',
        height: 'auto',
        padding: theme.spacing(2, 2, 1),
        backgroundColor: '#FFFFFF',
        borderTop: '2px solid #D0D0D0'
    },
    postContent: {
        width: '100%',
    },
    postInfoContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    postInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    avatar: {
        margin: 'auto',
        width: theme.spacing(6),
        height: theme.spacing(6)
    },
}))

