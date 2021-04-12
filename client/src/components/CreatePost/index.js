import React, { useState } from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import { DropzoneDialog } from 'material-ui-dropzone'

import PostService from 'services/postsService'
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined'
import { useStyles } from './styles'
const CreatePost = ({ onCreate }) => {
    const classes = useStyles()
    const [post, setPost] = useState('')
    const [attachFileModal, setAttachFileModal] = useState(false)
    const [attachedFiles, setAttachedFiles] = useState([])
    const handlePostChange = (event) => {
        setPost(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('postText', post)

        for (let file of attachedFiles) {
            formData.append("attahcedFiles", file)
        }
        PostService.createPost(formData)
            .then(() => {
                setPost('')
                onCreate()
            })
    }
    const handlAttachFiles = (files) => {
        setAttachedFiles(files)
    }
    const handleModalClose = () => {
        setAttachFileModal(false)
    }
    const handleModalOpen = () => {
        setAttachFileModal(true)
    }
    const handleAttachedFilesSave = () => {
        handleModalClose()

    }
    return (
        <>
            <form className={classes.root} onSubmit={handleSubmit}>
                <TextField
                    id="newPost"
                    className={classes.textArea}
                    value={post}
                    onChange={handlePostChange}
                    placeholder="New Post"
                    multiline
                />
                <Grid container>
                    <Grid item xs={3}>
                        <Button onClick={handleModalOpen}><AttachmentOutlinedIcon /></Button>
                    </Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={3}>
                        <Button
                            className={classes.submitButton}
                            variant='contained'
                            color='primary'
                            type='submit'
                        >
                            Post
                    </Button>
                    </Grid>
                </Grid>

            </form>
            <DropzoneDialog
                open={attachFileModal}
                onClose={handleModalClose}
                onDrop={handlAttachFiles}
                onSave={handleAttachedFilesSave}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                showPreviews={true}
            />
        </>
    )
}
export default CreatePost