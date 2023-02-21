import { Controller, useForm } from 'react-hook-form';
import { nextAxios } from '../../utils/axios';

import Button from '../Button/Button';
import Input from '../Input/Input';


import styles from './ContactUs.module.scss'
import { toast } from 'react-toastify';
import { useLang } from '../../hooks/useLang';
import FormError from '../Form/FormError';
import { useState } from 'react';
import { PatternFormat } from 'react-number-format';

const ContactUs = () => {
    const lang = useLang();
    const [formError, setFormError] = useState(null)

    const {
        register,
        handleSubmit,
        control,
        formState: {
            errors,
            isValid
        },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setFormError(null);
            const phone = data.phone.replace(/\D/g, '');

            if (phone.length !== 12) {
                return setFormError((prevVal) => ({
                    ...prevVal,
                    errors: {
                        phone_number: [lang?.['Неправильный формат номера телефона']]
                    }
                }))
            }

            const res = await nextAxios.post('/feedback', {
                "name": data.name,
                "phone": phone,
                "message": data.message
            })
            toast.success(lang?.['Ваша сообщение отправлено'])
            setFormError(null);
            reset();
        } catch (error) {
            console.error(error);
            toast.error(lang?.['Что-то пошло не так ☹️'])
        }
    }

    return (
        <div className={styles.container}>
            <h2 className='font-bold text-[24px] lg:font-semibold lg:text-[20px]'>{lang?.['Напишите нам']}</h2>
            {formError ? (
                <FormError error={formError} />
            ) : null}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative">
                    <input
                        {...register("name", {
                            required: {
                                value: true,
                                message: lang?.['Поле обязательно для заполнения']
                            }
                        })}
                        type="text"
                        id="name"
                        className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                        placeholder=" "
                        maxLength={255}
                    />
                    <label htmlFor="name" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">{lang?.['Ваше имя']}</label>
                </div>
                <div className="relative">
                    <Controller
                        control={control}
                        name="phone"
                        rules={{
                            required: true
                        }}
                        render={({ field: { onChange, name, value } }) => (
                            <PatternFormat
                                format="+998 (##) ### ## ##" allowEmptyFormatting
                                mask=" "
                                id="phone-number"
                                className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                                placeholder=" "
                                name={name}
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />
                    <label htmlFor="phone-number" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1">{lang?.['Номер телефона']}</label>
                </div>
                <div className="relative">
                    <textarea
                        {...register("message", {
                            required: {
                                value: true,
                                message: lang?.['Поле обязательно для заполнения']
                            }
                        })}
                        type="text"
                        id="message"
                        className="py-4 min-h-full block px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                        placeholder=" "
                        maxLength={10}
                    />
                    <label htmlFor="message" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-8 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">{lang?.['Сообщение']}</label>
                </div>
                <Button type="submit" active={!isValid}>{lang?.['Отправить']}</Button>
            </form>
        </div>
    )
}

export default ContactUs;