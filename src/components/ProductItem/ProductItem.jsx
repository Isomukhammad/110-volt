import Image from "next/image";
import Link from "next/link";

import styles from './ProductItem.module.scss';

const ProductItem = ({ info }) => {
    const { img, price, discounted, monthly, name } = info;

    return (
        <div className={styles.tab}>
            <Link href="/">
                <Image src={img} alt={name} width={254} height={254} />
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

export default ProductItem;