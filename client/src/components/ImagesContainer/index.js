import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import Modal from 'components/Modal'
import { useStyles } from './styles'
const ImagesContainer = ({ images }) => {
    const classes = useStyles()
    const [imageModal, setImageModal] = useState(false)
    const [currentImage, setCurrentImage] = useState()
    const gridWidth = (length) => {
        if (length === 1) return 12
        if (length === 2) return 6
        if (length === 3) return 4
        return 3
    }
    const handleImageClick = (fileIndex) => {
        setCurrentImage(fileIndex)
        setImageModal(true)
    }
    const handleModalClose = () => {
        setImageModal(false)
    }
    const handlImageChange = () => {
        setCurrentImage(() => {
            let newIdx = currentImage + 1
            if (newIdx >= images.length)
                return 0
            else if (newIdx < 0)
                return images.length - 1
            else
                return newIdx
        })
    }
    return (
        <>
            <Grid className={classes.root} container>
                {images.length > 0 &&
                    images.map((file, i, files) =>
                        <Grid item xs={gridWidth(files.length)} key={file}>
                            <img
                                alt="post attached images"
                                className={classes.image}
                                src={file}
                                onClick={() => handleImageClick(i)} />
                        </Grid>)
                }
            </Grid>
            <Modal
                open={imageModal}
                onClose={handleModalClose}
            >
                <img
                    className={classes.image}
                    alt="post attached images"
                    src={images[currentImage]}
                    onClick={handlImageChange }
                />
            </Modal>
        </>
    )
}
export default ImagesContainer