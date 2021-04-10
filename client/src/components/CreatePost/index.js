import React, { useState } from 'react'
import { TextField, Button, InputAdornment } from '@material-ui/core'
import { DropzoneDialog } from 'material-ui-dropzone'

import PostService from 'services/posts/postsService'
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
        console.log(formData)
        PostService.createPost(formData)
            .then(data => {
                console.log(data)
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
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <Button onClick={handleModalOpen}><AttachmentOutlinedIcon /></Button>
                            </InputAdornment>
                    }}
                />
                <Button
                    className={classes.submitButton}
                    variant='contained'
                    color='primary'
                    type='submit'
                >
                    Post
            </Button>

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