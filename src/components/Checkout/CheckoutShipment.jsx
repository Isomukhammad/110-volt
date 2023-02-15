import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useLang } from '../../hooks/useLang';
import fetcher from '../../utils/fetcher';
import styles from './CheckoutShipment.module.scss';

const CheckoutShipment = ({ register, errors }) => {
    const router = useRouter();
    const lang = useLang();
    const { data: shippingMethod, error: shippingError, isValidating: shippingValidating } = useSWR(['/shipping-methods', router.locale], (url) => fetcher(url, {
        headers: { 'Accept-Language': router.locale }
    }), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshWhenHidden: 0,
        refreshWhenHidden: false,
        refreshWhenOffline: false,
    });

    if (!shippingValidating) {
        return (
            <>
                <div className={styles.container}>
                    {
                        shippingMethod.data.map((method) => (
                            <div className={styles.radio} key={method.id}>
                                <input
                                    type="radio"
                                    id={`shipping-${method.id}`}
                                    name="shipping-method"
                                    value={method.id}
                                    className='focus:ring-transparent'
                                    {...register('shipping_method_id', {
                                        required: {
                                            value: true,
                                            message: 'Выберите способ доставки!'
                                        }
                                    })}
                                />
                                <label htmlFor={`shipping-${method.id}`}>{method.name}</label>
                            </div>
                        ))
                    }
                </div>
                {errors && <p className='text-red-600 fonr-semibold'>{errors.shipping_method_id?.message}</p>}
            </>
        )
    }
}

export default CheckoutShipment;