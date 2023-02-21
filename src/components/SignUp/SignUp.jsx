import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/authContext';
import { useLang } from '../../hooks/useLang';
import { nextAxios } from '../../utils/axios';

import Button from '../Button/Button';
import FormError from '../Form/FormError';

import styles from './SignUp.module.scss'

const SignUp = () => {
    const lang = useLang();
    const [isLoading, setIsLoading] = useState(false);
    const [otpOpen, setOtpOpen] = useState(false);
    const [formError, setFormError] = useState(null);
    const { sendOtp, checkOtp, handleRegister, handleLogin } = useAuth();

    const {
        register,
        handleSubmit,
        control,
        formState: {
            errors,
            isValid
        },
        reset
    } = useForm({
        defaultValues: {
            "name": '',
            "phone_number": '',
            "password": '',
            "confirm_password": ''
        }
    });

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            setFormError(null);
            if (data.password !== data.confirm_password) {
                return setFormError((prevVal) => ({
                    ...prevVal,
                    errors: {
                        password: [lang?.['Пароли должны совпадать друг с другом  ']],
                    }
                }))
            }


            const phone = data.phone_number.replace(/\D/g, '');

            if (phone.length !== 12) {
                return setFormError((prevVal) => ({
                    ...prevVal,
                    errors: {
                        phone_number: [lang?.['Неправильный формат номера телефона']]
                    }
                }))

            }

            const loginCheck = await nextAxios.post('/login/check', {
                phone_number: phone
            })

            if (loginCheck.data.user_exists) {
                return setFormError((prevError) => ({
                    ...prevError,
                    errors: {
                        logincheck: ['Пользователь с таким номером уже существует!'],
                    },
                }))
            }

            await nextAxios.post('/otp', {
                phone_number: phone
            })

            toast.info((lang?.[`Код подтверждения отправлен на {{number}}`]).replace('{{number}}', data.phone_number))
            setOtpOpen(true);
        } catch (error) {
            setFormError(error?.response?.data)
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    const onSubmit2 = async (data) => {
        try {
            setFormError(null)
            setIsLoading(true);
            const { name, password, phone_number } = data;
            const phone = phone_number.replace(/\D/g, '');
            await handleRegister({ name, password, phone_number: phone, otp: data.otp });
            toast.success('Регистрация прошла успешно');
            await handleLogin({ phone_number: phone, password })
            reset()
        } catch (error) {
            setFormError(error?.response?.data)
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            {formError ? (
                <FormError error={formError} />
            ) : null}
            {
                !otpOpen ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative">
                            <input
                                {...register("name", { required: true, maxLength: 255 })}
                                type="text"
                                id="fullName"
                                className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                                placeholder=" "
                            />
                            <label htmlFor="fullName" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">{lang?.['Имя и Фамилия']}</label>
                        </div>

                        <div className="relative">
                            <Controller
                                control={control}
                                name="phone_number"
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onChange, name, value } }) => (
                                    <PatternFormat
                                        format="+998 (##) ### ## ##" allowEmptyFormatting
                                        mask="_"
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
                            <input
                                {...register("password", {
                                    required: true,
                                    minLength: {
                                        value: 8,
                                        message: "Пароль должен быть не менее 8 символов"
                                    },
                                    maxLength: 30
                                })}
                                type="password"
                                id="password"
                                className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer cursor-text"
                                placeholder=" "
                            />
                            <label htmlFor="password" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">{lang?.['Пароль']}</label>
                        </div>
                        <div className="relative">
                            <input
                                {...register("confirm_password", {
                                    required: true,
                                    minLength: {
                                        value: 8,
                                        message: "Пароль должен быть не менее 8 символов"
                                    },
                                    maxLength: 30
                                })}
                                type="password"
                                id="confirm-password"
                                className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                                placeholder=" "
                            />
                            <label htmlFor="confirm-password" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">{lang?.['Подтвердите пароль']}</label>
                        </div>
                        <Button
                            active={!isValid}
                            type="submit"
                            loading={isLoading}
                        >{lang?.['Зарегистрироваться']}</Button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit2)}>
                        <div className='relative'>
                            <input
                                {...register("otp", {
                                    required: 'Введите код отправленный на номер телефона!',
                                    minLength: "3"
                                })}
                                type="number"
                                id="otp"
                                className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                                placeholder=" "
                            />
                            <label htmlFor="otp" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">{lang?.['Код из СМС']}</label>
                        </div>
                        {
                            errors?.otp && <p className='text-red-500'>{errors?.otp?.message}</p>
                        }

                        <Button active={!isValid} type="submit">Войти</Button>
                        <button
                            onClick={() => setOtpOpen(false)}
                            className="text-accent font-semibold hover:text-accentDark transition duration-300"
                        >{lang?.['Вернуться назад']}</button>
                    </form>
                )
            }
        </div>
    )
}

export default SignUp;