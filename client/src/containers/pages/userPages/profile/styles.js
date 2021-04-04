import { makeStyles } from '@material-ui/core/styles'
const useStyle = makeStyles((theme) => ({
    root: {
        height: '100%',
        maxHeight: '100%',
        overflow: 'scroll'
    },
    banner: {
        minHeight: '30%',
        //backgroundColor: 'blue'
        backgroundImage: 'url(https://marketplace.canva.com/EADahxS2PEw/1/0/800w/canva-snowy-mountaintops-profile-header-sU9map7BguQ.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: 'white',
        height: '100px',
        width: '100px',
    },
    infoPanel: {
        minHeight: '25%',
        borderTop: '1px solid grey',
    },

    profileInfo: {
        width: '100%',
    },
    tabs: {
        width: '100%',
    }

}));

export { useStyle }
