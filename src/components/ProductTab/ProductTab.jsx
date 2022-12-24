import Image from 'next/image';
import Link from 'next/link';

import styles from './ProductTab.module.scss'

const ProductTab = ({ info }) => {
    const { description, monthly, price, discounted, img } = info;

    return (
        <div className={styles.container}>
            <Link href="/">
                <Image src={img} alt={description} sizes="100vw" width={0} height={0} placeholder="blurDataURL" />
            </Link>

            <div className={styles.prices}>
                <p>{monthly} сум/мес</p>
                <p>{discounted} сум</p>
                <p>{price} сум</p>
            </div>

            <p className={styles.description}>{description}</p>
        </div>
    )
}

export default ProductTab;