import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../../context/cart";
import { isActive } from "../../utils/funcs";

import styles from './CategoryItem.module.scss';

const CategoryItem = ({ info }) => {
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
        setWidth(0)
    }

    const decreaseWidth = () => {
        setWidth(-100);
    }

    const stopProp = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
        console.log(cartReqLoading)
    }, [cartReqLoading])

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
                <p>{monthly} сум/мес</p>
            </div>
            <div className={styles.name}>{name}</div>
            <div className={styles.prices}>
                <p>{current_price_formatted}</p>
                <p>{old_price_formatted}</p>
            </div>
            <button className={`${styles.cart} ${productInCart ? styles.active : ''}`} onClick={(e) => {
                stopProp(e)
                handleCart({ type: 'SWITCH', product: info })
            }}>
                <svg
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    fill={productInCart ? "none" : "none"}
                    stroke={productInCart ? "#7B54C9" : "white"}
                >
                    <use xlinkHref="#bag-logo"></use>
                </svg>
            </button>
        </Link>
    )
}

export default CategoryItem;