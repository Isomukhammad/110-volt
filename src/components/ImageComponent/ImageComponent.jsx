import Image from "next/image";

import styles from './ImageComponent.module.scss'

const ImageComponent = ({ src, alt }) => (
    <>
        {src ? (
            <Image
                src={src}
                alt={alt}
                width={0}
                height={0}
                sizes="100vw"
                placeholder="blurDataURL"
                className={styles.container}
            />
        ) : null}
    </>
)

export default ImageComponent;