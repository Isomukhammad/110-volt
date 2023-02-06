import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Button from '../Button/Button';
import QuickView from '../QuickView/QuickView';

import styles from './ProductTab.module.scss'
import { ScreenContext } from '../../context/screenContext';
import { useCart } from '../../context/cart';

const ProductTab = ({
    index,
    product,
    setProductId,
    productId,
    arrLength
}) => {
    const [quickView, setQuickView] = useState('false');
    const [imgSrc, setImgSrc] = useState(product.img);
    const { handleCart, cartReqLoading, cart, localCart } = useCart();

    const store = cart || localCart;

    useEffect(() => {
        console.log(store);
    }, [store])

    useEffect(() => {
        if (productId === index) {
            setQuickView('true')
        }
    }, [productId, index])

    const { isMobile } = useContext(ScreenContext);
    return (
        <>
            <Link
                href={`/product/${product.id}-${product.slug}`}
                className={styles.container}
            >
                <div className={styles.preview}>
                    <div
                        className={styles.quickReview}
                        onClick={(e) => {
                            e.preventDefault();
                            setProductId(index);
                            setQuickView('true');
                        }}
                    >
                        Быстрый просмотр
                    </div>
                    <div className={styles.image}>
                        <Image
                            src={imgSrc}
                            alt={product.name}
                            sizes="100vh"
                            width={0}
                            height={0}
                            onError={() => {
                                setImgSrc('/images/placeholder.jpg')
                            }}
                        />
                    </div>
                </div>

                <div className={styles.prices}>
                    {
                        product.installment_prices[0] ? (
                            <p>{monthly} сум/мес</p>
                        ) : null
                    }
                    <p>{product.current_price_formatted}</p>
                    <p>{product.old_price_formatted}</p>
                </div>

                <p className={styles.description}>{product.description}</p>

                {
                    isMobile ? (
                        null
                    ) : (
                        <div
                            className={styles.buttons}
                            onClick={(e) => e.preventDefault()}
                        >
                            <div

                            >
                                <button className="bg-accent padding-1 text-white" onClick={() => handleCart({ type: 'SWITCH', product })}>
                                    В корзину
                                </button>
                            </div>
                            <svg
                                viewBox='0 0 24 24'
                                width={24}
                                height={24}
                                fill="none"
                                stroke="#BDBDBD"
                            >
                                <use xlinkHref="#heart"></use>
                            </svg>
                        </div>
                    )
                }
            </Link >
            <QuickView
                setQuickView={setQuickView}
                data={product}
                quickView={quickView}
                index={index}
                productId={productId}
                setProductId={setProductId}
                arrLength={arrLength}
            />
        </>
    )
}

export default ProductTab;