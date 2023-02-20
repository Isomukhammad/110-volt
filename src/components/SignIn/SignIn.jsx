import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { useAuth } from '../../context/authContext';
import { useCart } from '../../context/cartContext';
import { useLang } from '../../hooks/useLang';
import Button from '../Button/Button';
import FormError from '../Form/FormError';
import styles from './SignIn.module.scss'

const SignIn = () => {
    const lang = useLang();
    const [isLoading, setIsLoading] = useState(false);
    const { handleLogin } = useAuth();
    const [formError, setFormError] = useState(null);
    const { getAndSetCart } = useCart();

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
        mode: "onBlur",
        defaultValues: { "phone_number": "", "password": "" }
    });

    const onSubmit = async (data) => {
        try {
            setFormError(null);
            setIsLoading(true);

            const phone_number = data.phone_number.replace(/\D/g, '');
            if (phone_number.length !== 12) {
                return setFormError((prevVal) => ({
                    ...prevVal,
                    errors: {
                        phone_number: [lang?.['Неправильный формат номера телефона']]
                    }
                }))

            }

            await handleLogin({ phone_number, password: data.password });
            getAndSetCart();
        } catch (err) {
            setFormError(err?.response?.data)
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            {formError ? (
                <div className='mb-4'>
                    <FormError error={formError} />
                </div>
            ) : null}
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                format="+998 (##) ### ## ##"
                                allowEmptyFormatting mask=" "
                                id="phone_number"
                                className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                                placeholder=" "
                            />
                        )}
                    />
                    <label
                        htmlFor="phone_number"
                        className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">
                        {lang?.['Номер телефона']}
                    </label>
                </div>
                <div className="relative">
                    <input
                        {...register("password", { required: true, minLength: 8, maxLength: 80 })}
                        type="password"
                        id="password"
                        className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="password"
                        className="absolute text-[15px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">
                        {lang?.['Пароль']}
                    </label>
                </div>
                <Button
                    type="submit"
                    active={!isValid}
                    loading={isLoading}
                    className="bg-accent py-4 rounded-base font-semibold text-[16px] text-white hover:bg-accentDark transition duration-300 disabled:bg-gray7 disabled:text-placeholder"
                >{lang?.['Войти']}</Button>
            </form>
        </div>
    )
}

export default SignIn;