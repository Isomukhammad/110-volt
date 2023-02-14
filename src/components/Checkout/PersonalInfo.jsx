import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ConnectOption from './ConnectOption';
import ImageDrop from '../ImageDrop/ImageDrop';
import CheckoutInstallment from './CheckoutInstallment';
import CheckoutPayment from './CheckoutPayment';

import styles from './PersonalInfo.module.scss'

const PersonalInfo = ({ register, errors }) => {
    const [method, setMethod] = useState('immediately');
    const [formError, setFormError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (router.query.instalment) {
            setMethod('instalment');
        }
    }, [router]);

    return (
        <div className={styles.container}>
            <h1 className='hidden lg:flex text-[24px] font-bold lg:text-[32px]'>Личный данные</h1>
            <div className={styles.contactInfo}>
                <div className={styles.category}>
                    <h4 className='font-semibold'>Контактная информация</h4>
                    <div className={styles.personalInformation}>
                        <div className="relative">
                            <input type="text" {...register("name", { required: true, maxLength: 255 })} id="name" className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray5 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer" placeholder=" " />
                            <label htmlFor="name" className="absolute text-[15px] text-[#C0C0C0] duration-300 transform -translate-y-4 scale-100 top-1.5 z-[1] origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#C0C0C0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Имя и Фамилия</label>
                        </div>
                        <div className="relative">
                            <input type="number" {...register("phone_number", { required: true, maxLength: 255 })} id="phone-number" className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray5 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer" placeholder=" " />
                            <label htmlFor="phone-number" className="absolute text-[15px] text-[#C0C0C0] duration-300 transform -translate-y-4 scale-100 top-1.5 z-[1] origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#C0C0C0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Номер телефона</label>
                        </div>
                        <div className="relative">
                            <input type="email" {...register("email", { required: true, maxLength: 255 })} id="email" className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray5 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer" placeholder=" " />
                            <label htmlFor="email" className="absolute text-[15px] text-[#C0C0C0] duration-300 transform -translate-y-4 scale-100 top-1.5 z-[1] origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#C0C0C0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">E-mail</label>
                        </div>
                        <div className="relative">
                            <input type="text" {...register("address", { required: true, maxLength: 255 })} id="address" className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray5 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer" placeholder=" " />
                            <label htmlFor="address" className="absolute text-[15px] text-[#C0C0C0] duration-300 transform -translate-y-4 scale-100 top-1.5 z-[1] origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#C0C0C0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Адрес</label>
                        </div>
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
                                </div>
                            </>
                        ) : (
                            <>
                                <CheckoutInstallment register={register} errors={errors} />
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo;