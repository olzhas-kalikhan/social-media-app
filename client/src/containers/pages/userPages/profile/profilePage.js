import React, { useContext } from 'react'

import { useStyle } from './styles'
import { AuthContext } from 'context/user/authContext'
import { dateToString } from './helper'


import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import { a11yProps, TabPanel } from 'components/tabPanel/tabPanel'
import PostsTab from './postsTab/postsTab'

const ProfilePage = (props) => {
    const { user } = useContext(AuthContext)
    const [tabValue, setTabValue] = React.useState(0);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const classes = useStyle()
    console.log(user.date)
    return (
        <div className={classes.root}>
            <div className={classes.banner}> </div>
            <div className={classes.infoPanel}>
                <Avatar className={classes.avatar} />
                <div className={classes.profileInfo}>
                    <Typography variant='h6'>{user.name}</Typography>
                    <Typography variant='body2'>Joined {dateToString(user.date)}</Typography>
                    <div className={classes.tabs}>
                        <Tabs variant='fullWidth' value={tabValue} onChange={handleTabChange}>
                            <Tab label='Posts' {...a11yProps(0)} />
                            <Tab label='Media' {...a11yProps(1)} />
                        </Tabs>
                        <TabPanel value={tabValue} index={0}>
                            <PostsTab />
                        </TabPanel>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    )
}
export default ProfilePage