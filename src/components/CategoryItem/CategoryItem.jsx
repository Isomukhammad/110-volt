import Image from "next/image";
import Link from "next/link";

import styles from './CategoryItem.module.scss';

const CategoryItem = ({ info }) => {
    const { img, price, discounted, monthly, name } = info;

    return (
        <div className={styles.tab}>
            <Link href="/">
                <Image src={img} alt={name} sizes="100vw" width="0" height="0" placeholder="blurDataURL" />
            </Link>
            <div className={styles.monthly}>{monthly} сум/мес</div>
            <div className={styles.name}>{name}</div>
            <div className={styles.prices}>
                <p>{price} сум</p>
                <p>{discounted} сум</p>
            </div>
        </div>
    )
}

export default CategoryItem;