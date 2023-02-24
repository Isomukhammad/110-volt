import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ConnectOption from './ConnectOption';
import CheckoutInstallment from './CheckoutInstallment';
import CheckoutPayment from './CheckoutPayment';

import styles from './PersonalInfo.module.scss'
import { useLang } from '../../hooks/useLang';
import CheckoutShipment from './CheckoutShipment';
import { Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import AddressModal from './AddressModal';

const PersonalInfo = ({ register, errors, control, address, setAddressOpen }) => {
    const router = useRouter();
    const lang = useLang();
    const [method, setMethod] = useState('immediately');
    const [formError, setFormError] = useState(null);

    // useEffect(() => {
    //     if (router.query.instalment) {
    //         setMethod('instalment');
    //     }
    // }, [router]);

    return (
        <div className={styles.container}>
            <h1 className='hidden lg:flex text-[24px] font-bold lg:text-[32px]'>{lang?.['Личные данные']}</h1>
            <div className={styles.contactInfo}>
                <div className={styles.category}>
                    <h4 className='font-semibold'>{lang?.['Контактная информация']}</h4>
                    <div className={styles.personalInformation}>
                        <div className="relative">
                            <input type="text" {...register("name", { required: true, maxLength: 255 })} id="name" className={`block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 ${errors?.name ? 'border-red-500' : 'border-gray5'} appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer`} placeholder=" " />
                            <label htmlFor="name" className="absolute text-[15px] text-[#C0C0C0] duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#C0C0C0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">{lang?.['Имя и Фамилия']}</label>
                        </div>
                        <div className='relative'>
                            <Controller
                                control={control}
                                name="phone_number"
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onChange, name, value } }) => (
                                    <PatternFormat
                                        name={name}
                                        value={value}
                                        onChange={onChange}
                                        format="+998 (##) ### ## ##" allowEmptyFormatting mask=" "
                                        id="phone_number"
                                        className={`block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 ${errors.phone_number ? 'border-red-500' : 'border-gray-300'} appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer`}
                                        placeholder=" "
                                    />
                                )}
                            />
                            <label htmlFor="phone_number" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">{lang?.['Номер телефона']}</label>
                        </div>
                        <div className="relative order-1 lg:order-none" onClick={() => setAddressOpen(true)}>
                            <input type="text" value={address ? address : ''} id="address" className={`block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 ${errors?.name ? 'border-red-500' : 'border-gray5'} appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer`} placeholder=" " disabled />
                            <label htmlFor="address" className="absolute text-[15px] text-[#C0C0C0] duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#C0C0C0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">{lang?.['Адрес']}</label>
                        </div>
                        <div className='order-2 lg:order-none'>
                            <button className={`${errors?.address_id ? 'border-red-500' : 'border-accent'} py-4 w-full h-full ${errors?.address_id ? 'text-red-500' : 'text-accent'} border rounded-[16px] hover:text-white hover:bg-accent trnasition duration-300 font-semibold`} type="button" onClick={() => setAddressOpen(true)}>{lang?.['Выберите адрес']}</button>
                        </div>
                        <div className="relative">
                            <input type="email" {...register("email", { required: true, maxLength: 255 })} id="email" className={`block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 ${errors.email ? 'border-red-500' : 'border-gray5'} appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer`} placeholder=" " />
                            <label htmlFor="email" className="absolute text-[15px] text-[#C0C0C0] duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#C0C0C0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">{lang?.['E-mail']}</label>
                        </div>
                    </div>
                </div>
                {/* <div className={styles.category}>
                    <h4 className='font-semibold'>Как с вами связаться</h4>
                    <ConnectOption />
                </div> */}
                <div className={styles.category}>
                    <h4 className='font-semibold'>{lang?.['Тип заказа']}</h4>
                    <div className={styles.orderType}>
                        <button
                            className={`${styles.buyNow} ${method === 'immediately' ? styles.active : ''}`}
                            onClick={() => setMethod('immediately')}
                            type="button"
                        >{lang?.['Купить сразу']}</button>
                        <button
                            className={`${styles.installment} ${method === 'instalment' ? styles.active : ''}`}
                            onClick={() => setMethod('instalment')}
                            type="button"
                            disabled={true}
                        >{lang?.['Купить в рассрочку']}</button>
                    </div>
                </div>
                <div className={`${styles.category} ${method !== 'immediately' ? styles.immediately : ''}`}>
                    {
                        method === 'immediately' ? (
                            <>
                                <h4 className='font-semibold'>{lang?.['Доставка и оплата']}</h4>
                                <div className={styles.chosePayment}>
                                    <CheckoutPayment register={register} errors={errors} />
                                </div>
                                <hr />
                                <div className={styles.chosePayment}>
                                    <CheckoutShipment register={register} errors={errors} />
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