import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded'

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
    },
    {
        title: 'Friends',
        path: '/friends',
        icon: (props) => <SupervisedUserCircleRoundedIcon {...props} />,
    }
]