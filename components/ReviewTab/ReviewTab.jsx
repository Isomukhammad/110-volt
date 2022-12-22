import Image from "next/image";

import styles from './ReviewTab.module.scss';

const ReviewTab = ({ info }) => {
    const { decsription, img } = info;
    console.log(info)
    return (
        <div className={styles.tab}>
            <div className={styles.tab}>
                <Image src={img} alt={name} width="0" height="0" sizes="100vw" className={styles.image} placeholder="blurDataURL" />
            </div>
            <p>{decsription}</p>
        </div>
    )
}

export default ReviewTab;