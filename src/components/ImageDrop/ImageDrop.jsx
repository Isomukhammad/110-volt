import Image from "next/image";
import { useCallback, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";

import styles from './ImageDrop.module.scss'

const ImageDrop = ({ image }) => {
    const [imgSrc, setImgSrc] = useState(image);

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({
        onDrop: acceptedFiles => {
            setImgSrc(Object.assign(acceptedFiles[0], {
                preview: URL.createObjectURL(acceptedFiles[0])
            }));
        },
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
            <Image
                src={imgSrc.preview ? imgSrc.preview : imgSrc}
                sizes="100vw"
                width={0}
                height={0}
                alt=""
                onLoad={() => { URL.revokeObjectURL(imgSrc.preview) }}
            />
            <div className={styles.description}>
                <p><span className={styles.input} {...getRootProps()}><input {...getInputProps()} />Нажмите на ссылку</span>, чтобы выбрать фотографии или просто перетащите их сюда</p>
            </div>

            <aside>
                {acceptedFileItems}
            </aside>
        </div>
    );
}

export default ImageDrop;