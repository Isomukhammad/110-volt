import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import ImageComponent from '../ImageComponent/ImageComponent';
import styles from './ProductHeader.module.scss'

const ProductHeader = ({ product, show }) => {
    return (
        <div className={`${styles.container} ${show === 'true' ? styles.show : ''}`}>
            <div className={styles.content}>
                <div className={styles.product}>
                    <ImageComponent
                        src={product?.img[0]}
                        alt={product?.subtitle}
                    />
                    <p>{product?.subtitle}</p>
                </div>
                <div className={styles.line}></div>
                <div className={styles.prices}>
                    <p className={styles.monthly}>{product?.monthly} сум/мес <span>x 12 месяцев</span></p>
                    <p className={styles.discounted}>{product?.discounted} сум</p>
                    <p className={styles.price}>{product?.price} сум</p>
                </div>
                <div className={styles.buttons}>
                    <Button>Добавить в корзину</Button>
                    <Button type="reverse">Купить в рассрочку</Button>
                </div>
            </div>
        </div>
    )
}

export default ProductHeader;