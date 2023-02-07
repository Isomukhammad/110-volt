import { useContext, useState } from 'react';

import HeadInfo from '../../utils/HeadInfo';
import { ScreenContext } from '../../context/screenContext'

import products from '../../products.json';

import CartItem from '../../components/Cart/CartItem';
import CartError from '../../components/Cart/CartEmpty';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import PagePath from '../../components/PagePath/PagePath';
import CartTotal from '../../components/Cart/CartTotal';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';

import styles from './Checkout.module.scss';
import PopUp from '../../components/PopUp/PopUp';
import { useCart } from '../../context/cart';

const CheckoutPage = () => {
    const { isMobile } = useContext(ScreenContext)
    const [popUp, setPopUp] = useState(false);
    const { cartLoading, cart, localCart, handleCart } = useCart();

    const store = cart || localCart;

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
                <div className={styles.wrapper}>
                    <div>
                        {
                            products ? (
                                <>
                                    {
                                        <div className={styles.content}>
                                            <h1 className={styles.title}>Корзина</h1>

                                            {!cartLoading && store ? (
                                                <div className={styles.cart}>
                                                    <div className={styles.cartItems}>
                                                        {

                                                            store.items.map((item) => (
                                                                <CartItem key={item.id} item={item} />
                                                            ))
                                                        }
                                                        <hr />
                                                        <div className={styles.amount}>
                                                            <div></div>
                                                            <div>Итого:</div>
                                                            <div>63 114 300 сум</div>
                                                        </div>
                                                    </div>
                                                </div>) : (<p>Загрузка товаров...</p>)}
                                        </div>
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
                    </div>
                    <div className={styles.cartTotal}>
                        {!cartLoading && store ? (<CartTotal offer={true} store={store} />) : null}
                    </div>
                </div>
                <DiscountTabs />
            </div>
        </>
    );
}

export default CheckoutPage;