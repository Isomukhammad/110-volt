import Image from "next/image";
import Link from "next/link";

import styles from './CategoryItem.module.scss';

const CategoryItem = ({ info }) => {
    const { img, price, discounted, monthly, name } = info;

    return (
        <div className={styles.tab}>
            <div href='/' className={styles.image}>
                <Image src={img} alt={name} sizes="100vw" width="0" height="0" placeholder="blurDataURL" />
            </div>
            <div className={styles.monthly}>
                <div className={styles.background}></div>
                <p>{monthly} сум/мес</p>
            </div>
            <div className={styles.name}>{name}</div>
            <div className={styles.prices}>
                <p>{price} сум</p>
                <p>{discounted} сум</p>
            </div>
            <div className={styles.cart}>
                <svg
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    fill="none"
                >
                    <use xlinkHref="#bag-logo"></use>
                </svg>
            </div>
        </div>
    )
}

export default CategoryItem;