import CartError from '../../components/CartError/CartError';
import CartItem from '../../components/CartItem/CartItem';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import PagePath from '../../components/PagePath/PagePath';
import HeadInfo from '../../utils/HeadInfo';

import products from '../../products.json';

import styles from './Checkout.module.scss';
import CartTotal from '../../components/CartTotal/CartTotal';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';

const CheckoutPage = () => {
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
                    ) : (
                        <CartError />
                    )
                }
                <PersonalInfo />
                <DiscountTabs />
            </div>
        </>
    );
}

export default CheckoutPage;