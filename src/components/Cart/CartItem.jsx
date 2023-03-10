import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLang } from '../../hooks/useLang';
import { useCart } from '../../context/cartContext';
import ImageComponent from '../ImageComponent/ImageComponent';

import styles from './CartItem.module.scss'
import { thousandSeperate } from '../../utils/funcs';

const CartItem = ({ item, checkout }) => {
    const lang = useLang();
    const [imgSrc, setImgSrc] = useState(item.product.img);
    const { cart, handleCart } = useCart();

    const handleItemIncrement = () => {
        handleCart({
            type: 'UPDATE',
            product: item.product,
            quantity: cart ? item.quantity + 1 : 1,
        })
    }

    const handleItemDecrement = () => {
        if (item.quantity > 1) {
            handleCart({
                type: 'UPDATE',
                product: item.product,
                quantity: cart ? item.quantity - 1 : -1,
            })
        } else {
            handleCart({
                type: 'DELETE',
                product: item.product,
                quantity: item.quantity
            })
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.product}>
                <Link href={`/product/${item.product.id}-${item.product.slug}`}>
                    <Image
                        src={imgSrc || '/images/placeholder.jpg'}
                        alt="Product image"
                        sizes="120px"
                        width={120}
                        height={120}
                        onError={() => setImgSrc('/images/placeholder.jpg')}
                    />
                </Link>
                <Link href={`/product/${item.product.id}-${item.product.slug}`} className={styles.title}>{item.name}</Link>
            </div>
            <div className={`${styles.quantity} ${checkout ? styles.centrelized : ''}`}>
                {
                    checkout ? (
                        <div className={styles.checkoutQuantity}>x{item.quantity}</div>
                    ) : (
                        <>
                            <button onClick={handleItemDecrement}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#242424" xmlns="http://www.w3.org/2000/svg">
                                    <use xlinkHref='#minus'></use>
                                </svg>
                            </button>
                            <div className={styles.number}>
                                <span>{item.quantity}</span>
                                <hr />
                            </div>
                            <button onClick={handleItemIncrement}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#242424" xmlns="http://www.w3.org/2000/svg">
                                    <use xlinkHref='#plus'></use>
                                </svg>
                            </button>
                        </>
                    )
                }
            </div>
            <div className={styles.prices}>
                {
                    checkout ? (
                        <div className={styles.checkoutPrice}>{item.product.current_price_formatted}</div>
                    ) : (
                        <>
                            <div className={styles.monthly}>{thousandSeperate(item?.product?.installment_prices[0]?.prices[0]?.price_per_month)} {lang?.['??????/??????']} <span>x {item?.product?.installment_prices[0]?.prices[0]?.duration} {lang?.['??????????????']}</span>
                            </div>
                            <div className={styles.discounted}>{item.product.current_price_formatted}</div>
                            <div className={styles.price}>{item.product.old_price_formatted}</div>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default CartItem;