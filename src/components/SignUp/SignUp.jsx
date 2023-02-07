import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/auth';
import { nextAxios } from '../../utils/axios';

import Button from '../Button/Button';
import FormError from '../Form/FormError';
import FormInput from '../FormInput/FormInput';
import MsgCodeForm from './MsgCodeForm';

import styles from './SignUp.module.scss'

const SignUp = () => {
    const [otpOpen, setOtpOpen] = useState(false);
    const [formError, setFormError] = useState(null);
    const { sendOtp, checkOtp, handleRegister, handleLogin } = useAuth();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid
        },
        reset
    } = useForm({
        defaultValues: {
            "name": '',
            "phone-number": '',
            "email": '',
            "password": '',
            "confirm_password": ''
        }
    });

    const onSubmit = async (data) => {
        try {
            if (data.password !== data.confirm_password) {
                return setFormError((prevVal) => ({
                    ...prevVal,
                    errors: {
                        password: ['Пароли не совпадают!'],
                    }
                }))
            }

            const phone_number = data.phone_number.replace(/\D/g, '');

            const loginCheck = await nextAxios.post('/login/check', {
                phone_number
            })

            if (loginCheck.data.user_exists) {
                return setFormError((prevError) => ({
                    ...prevError,
                    errors: {
                        logincheck: ['Пользователь с таким номером уже существует!'],
                    },
                }))
            }

            await sendOtp({ phone_number });
            setOtpOpen(true);
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    const onSubmit2 = async (data) => {
        try {
            const { name, password, email, phone_number, otp } = data;
            setFormError(null)
            const otpCheck = await checkOtp({ phone_number, otp });

            if (otpCheck.errors) {
                otpCheck
            } else {
                alert('Correct!!!!!!!!!!')
            }
            await handleRegister({ name, password, phone_number, email, opt })
            await handleLogin({ phone_number, password })
            reset()
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.container}>
            <FormError error={formError} />
            {
                !otpOpen ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative">
                            <input
                                {...register("name", { required: true, maxLength: 80 })}
                                type="text"
                                id="fullName"
                                className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                                placeholder=" "
                            />
                            <label htmlFor="fullName" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Имя и фамилия</label>
                        </div>

                        <div className="relative">
                            <input
                                {...register("phone_number", { required: true, maxLength: 80 })}
                                type="number"
                                id="phone-number"
                                className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                                placeholder=" "
                            />
                            <label htmlFor="phone-number" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1">Номер телефона</label>
                        </div>
                        <div className="relative">
                            <input
                                {...register("email", { required: true, maxLength: 80 })}
                                type="email"
                                id="email"
                                className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                                placeholder=" "
                            />
                            <label htmlFor="email" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">E-mail</label>
                        </div>
                        <div className="relative">
                            <input
                                {...register("password", {
                                    required: true,
                                    minLength: {
                                        value: 8,
                                        message: "Пароль должен быть не менее 8 символов"
                                    },
                                    maxLength: 20
                                })}
                                type="password"
                                id="password"
                                className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer cursor-text"
                                placeholder=" "
                            />
                            <label htmlFor="password" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Пароль</label>
                        </div>
                        <div className="relative">
                            <input
                                {...register("confirm_password", {
                                    required: true,
                                    minLength: {
                                        value: 8,
                                        message: "Пароль должен быть не менее 8 символов"
                                    },
                                    maxLength: 20
                                })}
                                type="password"
                                id="confirm-password"
                                className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                                placeholder=" "
                            />
                            <label htmlFor="confirm-password" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Подтвердите пароль</label>
                        </div>
                        <Button active={!isValid}>Войти</Button>
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
                            <label htmlFor="otp" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Код из СМС</label>
                        </div>
                        {
                            errors?.otp && <p className='text-red-500'>{errors?.otp?.message}</p>
                        }
                        <Button active={!isValid}>Войти</Button>
                    </form>
                )
            }
        </div>
    )
}

export default SignUp;