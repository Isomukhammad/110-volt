import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import styles from './CheckoutPayment.module.scss';

const CheckoutPayment = ({ register, errors }) => {
    const router = useRouter();
    const { data: paymentMethod, error: paymentError, isValidating: paymentValidating } = useSWR(['/payment-methods', router.locale], (url) => fetcher(url, { headers: { 'Accept-Language': router.locale } }), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshWhenHidden: 0,
        refreshWhenHidden: false,
        refreshWhenOffline: false,
    });

    if (!paymentValidating) {
        return (
            <>
                <div className={styles.container}>
                    {
                        paymentMethod.data.map((method) => (
                            <div className={styles.radio} key={method.id}>
                                <input
                                    type="radio"
                                    id={`payment-${method.id}`}
                                    name="payment-method"
                                    value={method.id}
                                    className='focus:ring-transparent'
                                    {...register('payment_method_id', {
                                        required: {
                                            value: true,
                                            message: 'Выберите способ оплаты!'
                                        }
                                    })}
                                />
                                <label htmlFor={`payment-${method.id}`}>{method.name}</label>
                            </div>
                        ))
                    }
                </div>
                {errors && <p className='text-red-600 fonr-semibold'>{errors.payment_method_id?.message}</p>}
            </>
        )
    }
}

export default CheckoutPayment;