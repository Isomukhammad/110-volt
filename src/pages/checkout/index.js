import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from '../../context/cart';
import { useLang } from '../../hooks/useLang';
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
import { thousandSeperate } from '../../utils/funcs';
import AddressModal from '../../components/Checkout/AddressModal';
import { toast, ToastContainer } from 'react-toastify';

const CheckoutPage = () => {
    const lang = useLang();
    const [popUp, setPopUp] = useState(false);
    const { cartLoading, cart, localCart, handleCart } = useCart();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
    const [address, setAddress] = useState(null);
    const [addressOpen, setAddressOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const store = cart || localCart;

    const onSubmit = (data) => {
        try {
            setIsLoading(true);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (addressOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "scroll"
        }
    }, [addressOpen, errors])

    return (
        <>
            <HeadInfo title="Оформить заказ" />
            <PagePath
                paths={[
                    {},
                    {
                        "url": "cart",
                        "name": lang?.['Корзина']
                    },
                    {

                        "url": "",
                        "name": lang?.['Оформление заказа']

                    }
                ]}
            />
            <div className={styles.container}>
                {
                    cartLoading ? (
                        <div>{lang?.['Загрузка...']}</div>
                    ) : (cart && cart.quantity !== 0 ? (
                        <>
                            <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
                                <div>
                                    <div className={styles.content}>
                                        <h1 className="text-[24px] font-bold lg:text-[32px]">{lang?.['Оформление заказа']}</h1>

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
                                                        <div className='w whitespace-nowrap'>{thousandSeperate(store.total)} {lang?.['сум']}</div>
                                                    </div>
                                                </div>
                                            </div>) : (<p>{lang?.['Загрузка...']}</p>)}
                                    </div>
                                    <PersonalInfo register={register} errors={errors} control={control} address={address} setAddressOpen={setAddressOpen} />
                                    {
                                        popUp ? <PopUp result='success' setPopUp={setPopUp} /> : null
                                    }
                                </div>
                                <div className={styles.cartTotal}>
                                    {!cartLoading && store ? (<CartTotal offer={true} store={store} />) : null}
                                </div>
                            </form>
                            <AddressModal
                                addressOpen={addressOpen}
                                setAddressOpen={setAddressOpen}
                                setAddress={setAddress}
                                register={register}
                            />
                        </>
                    ) : (
                        <div className='flex flex-col items-center justify-center'>
                            <CartError />
                        </div>
                    )
                    )
                }
                <DiscountTabs />
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    draggable
                    theme="light"
                />
            </div>
        </>
    );
}

CheckoutPage.requireAuth = true;

export default CheckoutPage;