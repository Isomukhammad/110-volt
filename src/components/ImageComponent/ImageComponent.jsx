import Image from "next/image";

import styles from './ImageComponent.module.scss'

const ImageComponent = ({ src, alt }) => (
    <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        placeholder="blurDataURL"
        className={styles.container}
    />
)

export default ImageComponent;