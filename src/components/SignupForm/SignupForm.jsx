import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';

import styles from './Signup.module.scss'

const SignupForm = () => {
    const [formError, setFormError] = useState(null);

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

    const onSubmit = (data) => {
        if (data.password !== data.confirm_password) {
            return setFormError((prevVal) => ({
                ...prevVal,
                errors: {
                    password: ['Пароли не совпадают!'],
                }
            }))
        }
    }

    useEffect(() => {
        console.log(formError)
    }, [formError]);

    return (
        <div className={styles.container}>
            {
                formError ? {

                } : (null)
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative">
                    <input
                        {...register("name", { required: true, maxLength: 80 })}
                        type="text"
                        id="fullName"
                        className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                        placeholder=" "
                    />
                    <label for="fullName" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Имя и фамилия</label>
                </div>

                <div className="relative">
                    <input
                        {...register("phone_number", { required: true, maxLength: 80 })}
                        type="number"
                        id="phone-number"
                        className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                        placeholder=" "
                    />
                    <label for="phone-number" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1">Номер телефона</label>
                </div>
                <div className="relative">
                    <input
                        {...register("email", { required: true, maxLength: 80 })}
                        type="email"
                        id="email"
                        className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                        placeholder=" "
                    />
                    <label for="email" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">E-mail</label>
                </div>
                <div className="relative">
                    <input
                        {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20
                        })}
                        type="password"
                        id="password"
                        className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer cursor-text"
                        placeholder=" "
                    />
                    <label for="password" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Пароль</label>
                </div>
                <div className="relative">
                    <input
                        {...register("confirm_password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20
                        })}
                        type="password"
                        id="confirm-password"
                        className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                        placeholder=" "
                    />
                    <label for="confirm-password" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Подтвердите пароль</label>
                </div>
                <Button active={!isValid}>Войти</Button>
            </form>
        </div>
    )
}

export default SignupForm;