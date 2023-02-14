import Image from "next/image";
import { useState } from "react";

import styles from './ImageComponent.module.scss'

const ImageComponent = ({ src, alt, ...otherProps }) => {
    return (
        <Image
            src={src || '/images/placeholder.jpg'}
            alt={alt}
            width={0}
            height={0}
            sizes="100vw"
            placeholder="blurDataURL"
            className={styles.container}
            {...otherProps}
        />
    )
}

export default ImageComponent;