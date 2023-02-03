import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import styles from './CategoryItem.module.scss';

const CategoryItem = ({ info }) => {
    const { h1_name, old_price_formatted, current_price_formatted, url, img, price, discounted, monthly, name } = info;
    const [width, setWidth] = useState(100);

    const increaseWidth = () => {
        setWidth(0)
    }

    const decreaseWidth = () => {
        setWidth(-100);
    }

    return (
        <div
            className={styles.tab}
            onMouseEnter={increaseWidth}
            onMouseLeave={decreaseWidth}
        >
            <div href='/' className={styles.image}>
                <Image src={img} alt={name} sizes="100vw" width="0" height="0" placeholder="blurDataURL" />
            </div>
            <div className={styles.monthly}>
                <div
                    className={styles.background}
                    style={{ right: `${width}%` }}
                ></div>
                <p>{monthly} сум/мес</p>
            </div>
            <div className={styles.name}>{name}</div>
            <div className={styles.prices}>
                <p>{current_price_formatted} сум</p>
                <p>{old_price_formatted} сум</p>
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