import Image from "next/image";
import { useState } from "react";

import styles from './ImageComponent.module.scss'

const ImageComponent = ({ src, alt }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const handleImgError = () => {
        setImgSrc('/images/placeholder.jpg')
    }
    return (
        <Image
            src={imgSrc || '/images/placeholder.jpg'}
            alt={alt}
            width={0}
            height={0}
            sizes="100vw"
            placeholder="blurDataURL"
            className={styles.container}
            onError={(handleImgError)}
        />
    )
}

export default ImageComponent;