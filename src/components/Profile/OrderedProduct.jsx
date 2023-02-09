import ImageComponent from '../ImageComponent/ImageComponent'

import styles from './OrderedProduct.module.scss'

const OrderedProduct = () => {
    return (
        <div className={styles.container}>
            <div className={styles.product}>
                <section className={styles.image}>
                    <ImageComponent src={'/images/Rectangle 1176.png'} />
                </section>
                <section className={styles.title}>
                    <p>Ноутбук LENOVO IdeaPad S145-15IIL (i3-1005G1/4Gb/256Gb SSD/15.6&quot;FHD/UMA/Win10) 81W8001JRU</p>
                </section>
            </div>
            <p className={styles.quantity}>x 1</p>
            <p className={styles.price}>29 483 000 сум</p>
        </div>
    );
}

export default OrderedProduct;