import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '../../hooks/useLang';
import { ClipLoader } from 'react-spinners';
import { ScreenContext } from '../../context/screenContext';
import { useCart } from '../../context/cartContext';
import { useWish } from '../../context/wishContext'
import { isActive, thousandSeperate } from '../../utils/funcs';
import QuickView from '../QuickView/QuickView';
import Button from '../Button/Button';
import styles from './ProductTab.module.scss'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const ProductTab = ({
    index,
    product,
    setProductId,
    productId,
    arrLength,
    width
}) => {
    const router = useRouter();
    const lang = useLang();
    const [quickView, setQuickView] = useState('false');
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

    const handleCartSwitch = () => {
        if (productInCart || product.in_stock !== 0) {
            handleCart({ type: 'SWITCH', product })
        } else {
            toast.info('Товара не осталось в наличии')
        }
    }

    const handleRouteChange = (route) => router.push(route);

    const { isMobile } = useContext(ScreenContext);
    return (
        <>
            <Link
                href={`/product/${product.id}-${product.slug}`}
                className={styles.container}
            >
                <div
                    className={`${styles.preview} ${width ? 'w-[254px] lg:w-full' : ''}`}>
                    <button
                        className={styles.quickReview}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setProductId(index);
                            setQuickView('true');
                        }}
                    >
                        {lang?.['Быстрый просмотр']}
                    </button>
                    <div className={styles.image} style={{ backgroundImage: `url(${product.img}` }} />
                </div>

                <div className={styles.prices}>
                    {
                        product?.installment_prices[0].prices[0].price_per_month_formatted ? (
                            <p className={styles.monthly}> {thousandSeperate(product?.installment_prices[0].prices[0].price_per_month)} {lang?.['сум/мес']}</p>
                        ) : (
                            null
                        )
                    }
                    <p className={styles.current}>{product.current_price_formatted}</p>
                    <p className={styles.oldPrice}>{product.old_price_formatted}</p>
                </div>

                <p className={styles.description}>{product.description}</p>
                <div
                    className='absolute top-0 right-0 lg:hidden'
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                >
                    <button
                        className='p-3'
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleWish({ type: 'ADD', product })
                        }}
                    >
                        <svg
                            viewBox='0 0 24 24'
                            width={24}
                            height={24}
                            fill={productInWish ? "red" : "none"}
                            stroke={productInWish ? "none" : "#BDBDBD"}
                            onClick={() => handleWish({ type: 'ADD', product })}
                        ><use xlinkHref='#heart' /></svg>
                    </button>
                </div>
                <div
                    className={styles.buttons}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault()
                    }}
                >
                    <div>
                        <Button
                            className="bg-accent padding-1 text-white hover:bg-accentDark transition duration-300"
                            onClick={handleCartSwitch}
                            loading={cartReqLoading.id == product.id && cartReqLoading.type == 'SWITCH'}
                            customStyles="w-[128px] flex flex-col items-center justify-center"
                        >
                            {!productInCart && product.in_stock === 0 ? lang?.['нет в наличии'] : productInCart && product.in_stock !== 0 ? lang?.['В корзине'] : lang?.['в корзину']}
                        </Button>
                    </div>
                    <svg
                        viewBox='0 0 24 24'
                        width={24}
                        height={24}
                        fill={productInWish ? "red" : "none"}
                        stroke={productInWish ? "none" : "#BDBDBD"}
                        onClick={() => handleWish({ type: 'ADD', product })}
                        className="cursor-pointer"
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