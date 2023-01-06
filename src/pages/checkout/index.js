import { useContext, useState } from 'react';

import HeadInfo from '../../utils/HeadInfo';
import { ScreenSize } from '../../context/screenContext'

import products from '../../products.json';

import CartError from '../../components/CartError/CartError';
import CartItem from '../../components/CartItem/CartItem';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import PagePath from '../../components/PagePath/PagePath';
import CartTotal from '../../components/CartTotal/CartTotal';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';

import styles from './Checkout.module.scss';
import PopUp from '../../components/PopUp/PopUp';

const CheckoutPage = () => {
    const { isMobile } = useContext(ScreenSize)
    const [popUp, setPopUp] = useState(true)
    return (
        <>
            <HeadInfo title="Оформить заказ" />
            <PagePath
                paths={[
                    {
                        "url": "",
                        "name": "Главная"
                    }, {
                        "url": "cart",
                        "name": `Корзина`
                    }, {

                        "url": "",
                        "name": `Оформление заказа`

                    }
                ]}
            />
            <div className={styles.container}>
                {
                    products ? (
                        <>
                            {
                                !isMobile ? (
                                    <div className={styles.content}>
                                        <h1 className={styles.title}>Корзина</h1>

                                        <div className={styles.cart}>
                                            <div className={styles.cartItems}>
                                                <CartItem info={products[0].products[0]} checkout={true} />
                                                <CartItem info={products[0].products[0]} checkout={true} />
                                                <CartItem info={products[0].products[0]} checkout={true} />
                                                <hr />
                                                <div className={styles.amount}>
                                                    <div></div>
                                                    <div>Итого:</div>
                                                    <div>63 114 300 сум</div>
                                                </div>
                                            </div>
                                            <div className={styles.cartTotal}>
                                                <CartTotal offer={true} />
                                            </div>
                                        </div>
                                    </div>
                                ) : null
                            }
                        </>
                    ) : (
                        <CartError />
                    )
                }
                <PersonalInfo />
                {
                    popUp ? <PopUp result='success' setPopUp={setPopUp} /> : null
                }
                <DiscountTabs />
            </div>
        </>
    );
}

export default CheckoutPage;