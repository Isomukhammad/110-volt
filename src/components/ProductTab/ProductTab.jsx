import Link from 'next/link';

import ImageComponent from '../ImageComponent/ImageComponent'

import styles from './ProductTab.module.scss'

const ProductTab = ({ info }) => {
    let { description, monthly, price, discounted, img } = info;

    if (typeof img !== 'string') {
        img = info.img[0];
    }

    return (
        <div className={styles.container}>
            <div href='/' className={styles.image}>
                <Link href='/'>Быстрый просмотр</Link>
                <ImageComponent
                    src={img}
                    alt={description}
                />
            </div>

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