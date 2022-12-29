//Component is used in main page in cliets reviews row

import Image from "next/image";

import styles from './ReviewTab.module.scss';

const ReviewTab = ({ info }) => {
    const { description, img } = info;
    return (
        <div className={styles.tab}>
            <Image src={img} alt="" width="0" height="0" sizes="100vw" placeholder="blurDataURL" />
            <p>{description}</p>
        </div>
    )
}

export default ReviewTab;