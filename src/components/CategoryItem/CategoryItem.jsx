import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useCart } from "../../context/cartContext";
import { useMedia } from "../../context/screenContext";
import { useLang } from "../../hooks/useLang";
import { isActive, thousandSeperate } from "../../utils/funcs";

import styles from './CategoryItem.module.scss';

const CategoryItem = ({ info }) => {
    const lang = useLang();
    const { isDesktop } = useMedia();
    const { h1_name, old_price_formatted, current_price_formatted, url, img, price, discounted, monthly, name, id, slug } = info;
    const [width, setWidth] = useState(100);
    const [imgSrc, setImgSrc] = useState(img);
    const { handleCart, cartReqLoading, cart, localCart } = useCart();

    const store = cart || localCart;

    const productInCart = isActive({
        product: info,
        store: cart,
        localStore: localCart
    })

    const increaseWidth = () => {
        isDesktop ? setWidth(0) : null
    }

    const decreaseWidth = () => {
        isDesktop ? setWidth(-100) : null;
    }

    const stopProp = (event) => {
        event.preventDefault();
    }

    return (
        <Link href={`/product/${id}-${slug}`}
            className={styles.tab}
            onMouseEnter={increaseWidth}
            onMouseLeave={decreaseWidth}
        >
            <div href='/' className={styles.image}>
                <Image
                    src={imgSrc || '/images/placeholder.jpg'}
                    alt={name}
                    sizes="100vw"
                    width="0"
                    height="0"
                    onError={() => setImgSrc('/images/placeholder.jpg')}
                />
            </div>
            <div className={styles.monthly}>
                <div
                    className={styles.background}
                    style={{ right: `${width}%` }}
                ></div>
                <p>{thousandSeperate(info?.installment_prices[0]?.prices[0]?.price_per_month)} {lang?.['сум/мес']}</p>
            </div>
            <div className={styles.name}>{name}</div>
            <div className={styles.prices}>
                <p>{current_price_formatted}</p>
                <p>{old_price_formatted}</p>
            </div>
            <button className={`${styles.cart} ${productInCart ? styles.active : ''} ${cartReqLoading.id == info.id && cartReqLoading.type == 'SWITCH' ? styles.loading : ''}`} onClick={(e) => {
                stopProp(e)
                handleCart({ type: 'SWITCH', product: info })
            }}>
                {
                    cartReqLoading.id == info.id && cartReqLoading.type == 'SWITCH' ? (
                        <ClipLoader
                            color={productInCart ? "#7B54C9" : "#FFFFFF"}
                            size={16}
                        />
                    ) : (
                        <svg
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                            fill={productInCart ? "none" : "none"}
                            stroke={productInCart ? "#7B54C9" : "white"}
                        >
                            <use xlinkHref="#bag-logo"></use>
                        </svg>
                    )
                }
            </button>
        </Link>
    )
}

export default CategoryItem;