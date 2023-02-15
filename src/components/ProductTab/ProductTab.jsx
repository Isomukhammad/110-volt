import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '../../hooks/useLang';
import { ClipLoader } from 'react-spinners';
import { ScreenContext } from '../../context/screenContext';
import { useCart } from '../../context/cart';
import { useWish } from '../../context/wish'
import { isActive } from '../../utils/funcs';
import QuickView from '../QuickView/QuickView';
import Button from '../Button/Button';
import styles from './ProductTab.module.scss'

const ProductTab = ({
    index,
    product,
    setProductId,
    productId,
    arrLength,
    width
}) => {
    const lang = useLang();
    const [quickView, setQuickView] = useState('false');
    const [imgSrc, setImgSrc] = useState(product.img);
    const { handleCart, cartReqLoading, cart, localCart } = useCart();
    const { handleWish, wishReqLoading, wish, localWish } = useWish();

    const store = cart || localCart;

    const productInCart = isActive({
        product: product,
        store: cart,
        localStore: localCart
    })

    const productInWish = isActive({
        product,
        store: wish,
        localStore: localWish,
    })

    const { isMobile } = useContext(ScreenContext);
    return (
        <>
            <Link
                href={`/product/${product.id}-${product.slug}`}
                className={styles.container}
            >
                <div
                    className={`${styles.preview} ${width ? 'w-[254px] lg:w-full' : ''}`}>
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
                            priority
                        />
                    </div>
                </div>

                <div className={styles.prices}>
                    {
                        product.installment_prices[0] ? (
                            <p className={styles.monthly}>{monthly} сум/мес</p>
                        ) : null
                    }
                    <p className={styles.current}>{product.current_price_formatted}</p>
                    <p className={styles.oldPrice}>{product.old_price_formatted}</p>
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
                                <Button
                                    className="bg-accent padding-1 text-white hover:bg-accentDark transition duration-300"
                                    onClick={() => handleCart({ type: 'SWITCH', product })}
                                    loading={cartReqLoading.id == product.id && cartReqLoading.type == 'SWITCH'}
                                    customStyles="w-[128px] flex flex-col items-center justify-center"
                                >
                                    {productInCart ? lang?.['В корзине'] : lang?.['в корзину']}
                                </Button>
                            </div>
                            <svg
                                viewBox='0 0 24 24'
                                width={24}
                                height={24}
                                fill={productInWish ? "red" : "none"}
                                stroke={productInWish ? "none" : "#BDBDBD"}
                                onClick={() => handleWish({ type: 'ADD', product })}
                            >
                                {
                                    wishReqLoading.id == product.id && wishReqLoading.type == 'ADD' ? (
                                        <ClipLoader
                                            color="#7B54C9"
                                            size={16}
                                        />
                                    ) : (
                                        <use xlinkHref="#heart"></use>
                                    )
                                }
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