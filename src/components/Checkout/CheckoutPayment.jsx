import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import styles from './CheckoutPayment.module.scss';

const CheckoutPayment = ({ register, errors }) => {
    const { data: paymentMethod, error: paymentError, isValidating: paymentValidating } = useSWR('/payment-methods', (url) => fetcher(url));

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
                                    {...register('payment', {
                                        required: {
                                            value: true,
                                            message: 'Выберите способ оплаты!'
                                        }
                                    })}
                                />
                                <label htmlFor={`payment-${method.id}`}>Наличные</label>
                            </div>
                        ))
                    }
                </div>
                {errors && <p className='text-red-600 fonr-semibold'>{errors['payment']?.message}</p>}
            </>
        )
    }
}

export default CheckoutPayment;