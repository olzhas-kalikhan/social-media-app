import React, { useContext, useState } from 'react'

import { useStyle } from './styles'
import { AuthContext } from 'context/user/authContext'
import { dateToString } from 'utils/dateUtils'
import { DropzoneDialog } from 'material-ui-dropzone'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import IconButton from '@material-ui/core/IconButton'
import { a11yProps, TabPanel } from 'components/tabPanel/tabPanel'
import PostsTab from './postsTab/postsTab'
import Modal from 'containers/modal/modal'
import ProfileImageDropzone from './profileImageDropzone/profileImageDropzone'

import UserService from 'services/user/user'
const ProfilePage = (props) => {
    const { user } = useContext(AuthContext)
    const [tabValue, setTabValue] = useState(0);
    const [openAvatarModal, setAvatarModal] = useState(false)
    const [imageToUpload, setImageToUpload] = useState()
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const classes = useStyle()
    const handleAvatarModalOpen = () => {
        setAvatarModal(true)
    }
    const handleAvatarModalClose = () => {
        setAvatarModal(false)
    }
    const handleProfileImageChange = (files) => {
        setImageToUpload(files)
    }
    const handleProfileImageSave = () => {
        console.log(imageToUpload)
        const formData = new FormData();
        formData.append('myfile', imageToUpload);
        UserService.uploadProfileImage(formData[0])
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return (
        <div className={classes.root}>
            <div className={classes.banner}> </div>
            <div className={classes.infoPanel}>
                <IconButton disableRipple onClick={handleAvatarModalOpen}>
                    <Avatar className={classes.avatar} src={user.profileImage} />
                </IconButton>
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
            <DropzoneDialog
                open={openAvatarModal}
                onClose={handleAvatarModalClose}
                onDrop={handleProfileImageChange}
                onSave={handleProfileImageSave}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                showPreviews={true}
            />



        </div>
    )
}
export default ProfilePage