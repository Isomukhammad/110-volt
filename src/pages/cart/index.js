import { useEffect, useState } from 'react';
import { useCart } from '../../context/cart';
import HeadInfo from '../../utils/HeadInfo';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import PagePath from '../../components/PagePath/PagePath'
import PopularGoods from '../../components/PopularGoods/PopularGoods';
import CartItem from '../../components/Cart/CartItem';
import CartEmpty from '../../components/Cart/CartEmpty';
import CartTotal from '../../components/Cart/CartTotal';
import styles from './Cart.module.scss'

import products from '../../products.json';

const CartPage = () => {
    const { cartLoading, cart, localCart, handleCart } = useCart();

    const store = cart || localCart;

    return (
        <>
            <HeadInfo title="Корзина" />
            <PagePath
                paths={[
                    {
                        "url": "/",
                        "name": "Главная"
                    },
                    {
                        "url": "",
                        "name": `Корзина`
                    }
                ]}
            />

            <div className={styles.container}>
                {
                    store && store.items.length < 1 ? (
                        <CartEmpty />
                    ) : (
                        <div className={styles.content}>
                            <h1 className={`${styles.title} font-bold text-[24px] md:text-[32px]`}>Корзина</h1>

                            <div className={styles.cart}>
                                {!cartLoading && store ? (
                                    <>
                                        <div className={styles.cartItems}>
                                            {

                                                store.items.map((item) => (
                                                    <CartItem key={item.id} item={item} />
                                                ))
                                            }
                                        </div>
                                        <div className={styles.cartTotal}>
                                            <CartTotal store={store} handleCart={handleCart} />
                                        </div>
                                    </>
                                ) : (
                                    <p>Загрузка продуктов...</p>
                                )
                                }
                            </div>
                        </div>
                    )
                }
                <PopularGoods
                    title={'Популярные товары'} link="/products?is_popular-1&quantity=6"
                />
                <DiscountTabs />
            </div>
        </>
    )
}

export default CartPage;