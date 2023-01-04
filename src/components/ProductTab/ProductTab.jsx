import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Button from '../Button/Button';
import QuickView from '../QuickView/QuickView';

import styles from './ProductTab.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cartSlice';

const ProductTab = ({
    index,
    info,
    setProductId,
    productId,
    arrLength
}) => {
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.cartItems);

    const handleAddItemToCart = (product) => {
        dispatch(addItemToCart(product))
    }

    let { subtitle, description, monthly, price, discounted, img } = info;
    const [quickView, setQuickView] = useState('false');

    if (typeof img !== 'string') {
        img = info.img[0];
    }

    useEffect(() => {
        if (productId === index) {
            setQuickView('true')
        }
    }, [productId, index])

    return (
        <>
            <Link
                href={`/product/${subtitle}`}
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
                            src={img}
                            alt={description}
                            sizes="100vh"
                            width={0}
                            height={0}
                        />
                    </div>
                </div>

                <div className={styles.prices}>
                    <p>{monthly} сум/мес</p>
                    <p>{discounted} сум</p>
                    <p>{price} сум</p>
                </div>

                <p className={styles.description}>{description}</p>

                <div
                    className={styles.buttons}
                    onClick={(e) => e.preventDefault()}
                >
                    <div
                        onClick={() => handleAddItemToCart(info)}
                    >
                        <Button>
                            В корзину
                        </Button>
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
            </Link >
            <QuickView
                setQuickView={setQuickView}
                data={info}
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