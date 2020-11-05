import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'

export const items = [
    {
        title: 'Home',
        path: '/home',
        icon: (props) => <HomeRoundedIcon {...props} />,
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: (props) => <AccountCircleIcon {...props} />,
    }
]