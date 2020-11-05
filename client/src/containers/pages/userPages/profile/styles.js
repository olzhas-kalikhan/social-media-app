import { makeStyles } from '@material-ui/core/styles'
const useStyle = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
    banner: {
        minHeight: '25%',
        //backgroundColor: 'blue'
        backgroundImage: 'url(https://marketplace.canva.com/EADahxS2PEw/1/0/800w/canva-snowy-mountaintops-profile-header-sU9map7BguQ.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    infoPanel: {
        minHeight: '25%',
        borderTop: '1px solid grey',
        position: 'relative'
    },
    avatar: {
        border: '4px solid black',
        position: 'absolute',
        top: theme.spacing(-8),
        left: theme.spacing(2),
        width: theme.spacing(16),
        height: theme.spacing(16),
        [theme.breakpoints.down('md')]: {
            top: theme.spacing(-5),
            width: theme.spacing(10),
            height: theme.spacing(10)
        },
        [theme.breakpoints.down('sm')]: {
            top: theme.spacing(-4),
            width: theme.spacing(8),
            height: theme.spacing(8)
        }

    },
    profileInfo: {
        width:'100%',
        position: 'absolute',
        top: theme.spacing(9),
        [theme.breakpoints.down('md')]: {
            top: theme.spacing(6),
        },
        [theme.breakpoints.down('sm')]: {
            top: theme.spacing(5),
        }
    },
    tabs:{
        width:'100%',
    }

}));

export { useStyle }
