import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from '../../context/cart';
import HeadInfo from '../../utils/HeadInfo';
import CartItem from '../../components/Cart/CartItem';
import CartError from '../../components/Cart/CartEmpty';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import PagePath from '../../components/PagePath/PagePath';
import CartTotal from '../../components/Cart/CartTotal';
import PersonalInfo from '../../components/Checkout/PersonalInfo';
import PopUp from '../../components/PopUp/PopUp';

import styles from './Checkout.module.scss';
import Button from '../../components/Button/Button';

const CheckoutPage = () => {
    const [popUp, setPopUp] = useState(false);
    const { cartLoading, cart, localCart, handleCart } = useCart();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: { "phone_number": "", "password": "" }
    });

    const store = cart || localCart;

    const onSubmit = (data) => {
        alert(JSON.stringify(data))
        reset();
    }

    return (
        <>
            <HeadInfo title="Оформить заказ" />
            <PagePath
                paths={[
                    {
                        "url": "",
                        "name": "Главная"
                    }, {
                        "url": "/cart",
                        "name": `Корзина`
                    }, {

                        "url": "",
                        "name": `Оформление заказа`

                    }
                ]}
            />
            <div className={styles.container}>
                {
                    cartLoading ? (
                        <div>Загрузка</div>
                    ) : (cart && cart.quantity !== 0 ? (
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
                            <div>
                                <div className={styles.content}>
                                    <h1 className="text-[24px] font-bold lg:text-[32px]">Оформление заказа</h1>

                                    {!cartLoading && store ? (
                                        <div className={styles.cart}>
                                            <div className={styles.cartItems}>
                                                {

                                                    store.items.map((item) => (
                                                        <CartItem key={item.id} item={item} checkout={true} />
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
                                <PersonalInfo register={register} errors={errors} />
                                {
                                    popUp ? <PopUp result='success' setPopUp={setPopUp} /> : null
                                }
                            </div>
                            <div className={styles.cartTotal}>
                                {!cartLoading && store ? (<CartTotal offer={true} store={store} />) : null}
                            </div>
                        </form>
                    ) : (
                        <div className='flex flex-col items-center justify-center'>
                            <CartError />
                        </div>
                    )
                    )
                }
                <DiscountTabs />
            </div>
        </>
    );
}

CheckoutPage.requireAuth = true;

export default CheckoutPage;