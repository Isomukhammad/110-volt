import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import { useCart } from '../../context/cart';
import ImageComponent from '../ImageComponent/ImageComponent';
import styles from './ProductHeader.module.scss'
import { isActive } from '../../utils/funcs';
import { useLang } from '../../hooks/useLang';

const ProductHeader = ({ product, show, data }) => {
    const lang = useLang();
    const { handleCart, cartReqLoading, cart, localCart } = useCart();

    const store = cart || localCart;

    const productInCart = isActive({
        product: product,
        store: cart,
        localStore: localCart
    })

    return (
        <div className={`${styles.container} ${show === 'true' ? styles.show : ''}`}>
            <div className={styles.content}>
                <div className={styles.product}>
                    <Image
                        src={data.img || '/images/placeholder.jpg'}
                        alt={data.name}
                        width={104}
                        height={104}
                    />
                    <p>{data.h1_name}</p>
                </div>
                <div className={styles.line}></div>
                <div className={styles.prices}>
                    {
                        product?.installment_prices.length === 0 ? (
                            null
                        ) : (
                            <p className={styles.monthly}>{product?.installment_prices[0]} сум/мес <span>x 12 месяцев</span></p>
                        )
                    }
                    <p className={styles.discounted}>{data.current_price_formatted
                    }</p>
                    <p className={styles.price}>{data.old_price_formatted}</p>
                </div>
                <div className={styles.buttons}>
                    <div onClick={() => handleCart({ type: 'SWITCH', product })}>
                        <Button loading={cartReqLoading.id == product.id && cartReqLoading.type == 'SWITCH'}>{productInCart ? lang?.['Добавлено в корзину'] : lang?.['Добавить в корзину']}</Button>
                    </div>
                    <Button variant="reverse">{lang?.['Купить в рассрочку']}</Button>
                </div>
            </div>
        </div>
    )
}

export default ProductHeader;