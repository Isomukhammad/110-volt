import { useState } from 'react';
import products from '../../products.json';
import data from '../../data.json'

import HeadInfo from '../../utils/HeadInfo';

import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import PagePath from '../../components/PagePath/PagePath'
import PopularGoods from '../../components/PopularGoods/PopularGoods';
import CartError from '../../components/CartError/CartError';
import CartItem from '../../components/CartItem/CartItem';

import styles from './Cart.module.scss'
import CartTotal from '../../components/CartTotal/CartTotal';

const Cart = () => {
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
                    products ? (
                        <div className={styles.content}>
                            <h1 className={styles.title}>Корзина</h1>

                            <div className={styles.cart}>
                                <div className={styles.cartItems}>
                                    <CartItem info={products[0].products[0]} />
                                    <CartItem info={products[0].products[0]} />
                                    <CartItem info={products[0].products[0]} />
                                </div>
                                <div className={styles.cartTotal}>
                                    <CartTotal />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <CartError />
                    )
                }
                <PopularGoods
                    title="Популярные товары"
                />
                <DiscountTabs />
            </div>
        </>
    )
}

export default Cart;