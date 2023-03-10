import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from '../../context/cartContext';
import { useLang } from '../../hooks/useLang';
import HeadInfo from '../../utils/headInfo';
import CartItem from '../../components/Cart/CartItem';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import PagePath from '../../components/PagePath/PagePath';
import CartTotal from '../../components/Cart/CartTotal';
import PersonalInfo from '../../components/Checkout/PersonalInfo';
import PopUp from '../../components/Checkout/PopUp';

import styles from './Checkout.module.scss';
import Button from '../../components/Button/Button';
import { thousandSeperate } from '../../utils/funcs';
import AddressModal from '../../components/Checkout/AddressModal';
import { toast, ToastContainer } from 'react-toastify';
import { authAxios } from '../../utils/axios';
import { useRouter } from 'next/router';
import Empty from '../../components/Empty/Empty';

const CheckoutPage = () => {
    const router = useRouter();
    const lang = useLang();
    const [popUp, setPopUp] = useState(false);
    const { cartLoading, cart, localCart, handleCart } = useCart();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
    const [address, setAddress] = useState(null);
    const [addressOpen, setAddressOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const store = cart || localCart;

    const onSubmit = async (data) => {
        try {
            const phone_number = data.phone_number.replace(/\D/g, '');
            if (phone_number.length !== 12) {
                toast.error(lang?.['Неправильный формат номера телефона']);
                return null;
            }
            setIsLoading(true);
            const res = await authAxios.post('/orders', {
                name: data.name,
                phone_number: phone_number,
                email: data.email,
                address_id: data.address_id,
                payment_method_id: data.payment_method_id,
                shipping_method_id: data.shipping_method_id
            })
            setPopUp(true);
            setResult('success');
            reset();
        } catch (error) {
            console.error(error);
            setPopUp('fail');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (addressOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [addressOpen, errors])

    return (
        <>
            <HeadInfo title="Оформить заказ" />
            <PagePath
                paths={[
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
                                        popUp ? <PopUp result={result} setPopUp={setPopUp} /> : null
                                    }
                                </div>
                                <div className={styles.cartTotal}>
                                    {!cartLoading && store ? (<CartTotal offer={true} store={store} loading={isLoading} />) : null}
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
                            <Empty
                                img="/images/Empty-amico 1.png"
                                title={lang?.['Здесь пока ничего нет']}
                                description={lang?.['Загляните а главую или воспользуйтесь поиском']}
                                btnUrl='/'
                                btnText={lang?.['Вернуться на главную']}
                            />
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