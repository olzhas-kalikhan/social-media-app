import React, { useContext, useState } from 'react'
import { DropzoneDialog } from 'material-ui-dropzone'
import { Tabs, Tab, Avatar, Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'

import { useStyle } from './styles'
import { AuthContext } from 'context/user/authContext'
import { dateToString } from 'utils/dateUtils'
import UserService from 'services/user/user'

import { a11yProps, TabPanel } from 'components/tabPanel/tabPanel'
import PostsTab from './postsTab/postsTab'

const ProfilePage = (props) => {
    const { user, fetchUserData } = useContext(AuthContext)
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
    const handleProfileImageSave = (files) => {
        const formData = new FormData();

        formData.set(
            'image',
            imageToUpload[0],
            `${imageToUpload[0].lastModified}-${imageToUpload[0].name}`
        );
        UserService.uploadProfileImage(formData)
            .then(res => fetchUserData())
            .catch(err => console.log(err))
    }

    return (
        <div className={classes.root}>
            <div className={classes.banner}>
                <IconButton disableRipple onClick={handleAvatarModalOpen}>
                    <Avatar className={classes.avatar} src={user.profileImage} />
                </IconButton>
            </div>
            <div className={classes.infoPanel}>

                <div className={classes.profileInfo}>
                    <Typography variant='h2'>{user.name}</Typography>
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
            {/* <Modal title="Upload image"
                open={openAvatarModal}
                onClose={handleAvatarModalClose}
            >
                <Dropzone onFilesDrop={handleFileDrop} />
            </Modal> */}


        </div>
    )
}
export default ProfilePage