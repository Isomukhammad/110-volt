import { useState } from 'react';
import { useForm } from 'react-hook-form';

import ConnectOption from '../ConnectOption/ConnectOption';
import FormTextarea from '../FormTextarea/Formtextarea';
import ImageDrop from '../ImageDrop/ImageDrop';
import CheckoutInstallment from './CheckoutInstallment';
import CheckoutPayment from './CheckoutPayment';

import styles from './PersonalInfo.module.scss'

const PersonalInfo = ({ register, errors }) => {
    const [method, setMethod] = useState('immediately');
    const [formError, setFormError] = useState(null)

    return (
        <div className={styles.container}>
            <h1 className='hidden lg:flex text-[24px] font-bold lg:text-[32px]'>Личный данные</h1>
            <div className={styles.contactInfo}>
                <div className={styles.category}>
                    <h4 className='font-semibold'>Контактная информация</h4>
                    <div className={styles.personalInformation}>
                        <input
                            type="text"
                            placeholder='Имя и Фамилия' />
                        <input
                            type="text"
                            placeholder='Номер телефона' />
                        <input
                            type="text"
                            placeholder='E-mail' />
                        <input
                            type="text"
                            placeholder='Адресс' />
                    </div>
                </div>
                <div className={styles.category}>
                    <h4 className='font-semibold'>Как с вами связаться</h4>
                    <ConnectOption />
                </div>
                <div className={styles.category}>
                    <h4 className='font-semibold'>Тип заказа</h4>
                    <div className={styles.orderType}>
                        <button
                            className={`${styles.buyNow} ${method === 'immediately' ? styles.active : ''}`}
                            onClick={() => setMethod('immediately')}
                            type="button"
                        >Купить сразу</button>
                        <button
                            className={`${styles.installment} ${method === 'instalment' ? styles.active : ''}`}
                            onClick={() => setMethod('instalment')}
                            type="button"
                        >Купить в рассрочку</button>
                    </div>
                </div>
                <div className={`${styles.category} ${method !== 'immediately' ? styles.immediately : ''}`}>
                    {
                        method === 'immediately' ? (
                            <>
                                <h4 className='font-semibold'>Метод оплаты</h4>
                                <div className={styles.chosePayment}>
                                    <CheckoutPayment register={register} errors={errors} />
                                    {/* <div className={styles.column}>
                                        <div className={styles.radio}>
                                            <input
                                                type="radio"
                                                id="cash"
                                                name="payment-method"
                                                value="cash"
                                                className='focus:ring-transparent'
                                            />
                                            <label htmlFor="cash">Наличные</label>
                                        </div>
                                        <div className={styles.radio}>
                                            <input
                                                type="radio"
                                                id="uzcard"
                                                name="payment-method"
                                                value="uzcard"
                                                className='focus:ring-transparent'
                                            />
                                            <label htmlFor="uzcard">Картой Uzcard</label>
                                        </div>
                                        <div className={styles.radio}>
                                            <input
                                                type="radio"
                                                id="humo"
                                                name="payment-method"
                                                value="humo"
                                                className='focus:ring-transparent'
                                            />
                                            <label htmlFor="humo">Картой Humo</label>
                                        </div>
                                    </div>
                                    <div className={styles.column}>
                                        <div className={styles.radio}>
                                            <input
                                                type="radio"
                                                id="payme"
                                                name="payment-method"
                                                value="payme"
                                                className='focus:ring-transparent'
                                            />
                                            <label htmlFor="payme">Онлайн - PayMe</label>
                                        </div>
                                        <div className={styles.radio}>
                                            <input
                                                type="radio"
                                                id="click"
                                                name="payment-method"
                                                value="click"
                                                className='focus:ring-transparent'
                                            />
                                            <label htmlFor="click">Онлайн - Click</label>
                                        </div>
                                    </div> */}
                                </div>
                            </>
                        ) : (
                            <>
                                <CheckoutInstallment />
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo;