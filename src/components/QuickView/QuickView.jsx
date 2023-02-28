import Link from 'next/link';
import { useLang } from '../../hooks/useLang';

import { useCart } from '../../context/cartContext';
import { useWish } from '../../context/wishContext';

import { isActive } from '../../utils/funcs';

import Button from '../Button/Button';
import QuickViewSlider from '../QuickViewSlider/QuickViewSlider';

import styles from './QuickView.module.scss';
import { ClipLoader } from 'react-spinners';

const QuickView = ({
    index,
    data,
    quickView,
    setQuickView,
    productId,
    setProductId,
    arrLength
}) => {
    const lang = useLang();
    const { handleCart, cartReqLoading, cart, localCart } = useCart();
    const { handleWish, wishReqLoading, wish, localWish } = useWish();

    const store = cart || localCart;

    const productInCart = isActive({
        product: data,
        store: cart,
        localStore: localCart
    })

    const productInWish = isActive({
        product: data,
        store: wish,
        localStore: localWish,
    })

    return (
        <div
            className={`
            ${styles.container} 
            ${quickView == 'true' && index == productId ? styles.active : ''}
            `}
            onClick={() => setProductId(null)}
        >
            <div
                className={styles.content}
                onClick={(e) => e.stopPropagation()}
            >
                <QuickViewSlider data={data.gallery} />
                <div className={styles.information}>
                    <div className={styles.title}>
                        <h2>{data.h1_name}</h2>
                        <p>{lang?.['Код товара']}: {data.id}</p>
                    </div>
                    <div className={styles.buttons}>
                        <div
                            loading={cartReqLoading}
                            onClick={() => handleCart({ type: 'SWITCH', product: data })}
                        >
                            <Button active={data.in_stock === 0} loading={cartReqLoading.id == data.id && cartReqLoading.type == 'SWITCH'}>{!productInCart && data.in_stock === 0 ? lang?.['нет в наличии'] : productInCart && data.in_stock !== 0 ? lang?.['Добавлено в корзину'] : lang?.['Добавить в корзину']}</Button>
                        </div>
                        {
                            wishReqLoading ? (
                                <ClipLoader
                                    color="#B5159D"
                                    size={24}
                                />
                            ) : (
                                <svg
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill={productInWish ? "red" : "none"}
                                    stroke={productInWish ? "none" : "#BDBDBD"}
                                    onClick={() => handleWish({ type: 'ADD', product: data })}
                                >
                                    <use xlinkHref='#heart'></use>
                                </svg>

                            )
                        }
                    </div>
                </div>

                <Link href={`/product/${data.id}-${data.slug}`} className={styles.moreInfoBtn} onClick={() => setQuickView('false')}>
                    {lang?.['Больше информации']}
                </Link>

                {/* <button
                    className={`${styles.prevBtn} ${index === 0 ? styles.disabled : ''}`}
                    onClick={() => {
                        if (index !== 0) {
                            setProductId(productId - 1)
                        }
                    }}
                >
                    <svg
                        viewBox="0 0 16 13"
                        fill='none'
                        width="24px"
                        height="24px"
                        stroke="#7b54c9"
                    >
                        <use xlinkHref='#arrow-right'></use>
                    </svg>
                </button> */}
                {/* <button
                    className={`${styles.nextBtn} ${index === arrLength ? styles.disabled : ''}`}
                    onClick={() => {
                        if (index !== arrLength) {
                            setProductId(productId + 1)
                        }
                    }}
                >
                    <svg viewBox="0 0 16 13"
                        width={24}
                        height={24}
                        stroke="#7b54c9"
                        fill="none"
                    >
                        <use xlinkHref='#arrow-right'></use>
                    </svg>
                </button> */}
                <button
                    className={styles.closeBtn}
                    onClick={() => setQuickView('false')}
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="32px"
                        height="32px"
                        fill="#BDBDBD"
                    >
                        <use xlinkHref='#close'></use>
                    </svg>
                </button>
            </div>
        </div >
    )
}

export default QuickView;