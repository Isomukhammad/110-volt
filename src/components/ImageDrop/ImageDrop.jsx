import { useCallback } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import ImageComponent from "../ImageComponent/ImageComponent";

import styles from './ImageDrop.module.scss'

const ImageDrop = ({ image }) => {
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
    }, [])

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        maxFiles: 2
    })

    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} байт
        </li>
    ));

    return (
        <div className={styles.container}>
            <ImageComponent src={image} alt="" />
            <div className={styles.description} {...getRootProps()}>
                <p> <input {...getInputProps()} className={styles.input} />, чтобы выбрать фотографии или просто перетащите их сюда</p>
            </div>

            <aside>
                {acceptedFileItems}
            </aside>
        </div>
    );
}

export default ImageDrop;