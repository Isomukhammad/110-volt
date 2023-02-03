import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/auth';
import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';
import styles from './SigninForm.module.scss'

const SigninForm = () => {
    const { handleLogin } = useAuth();
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
        mode: "onBlur",
        defaultValues: { "phone_number": "", "password": "" }
    });

    const onSubmit = async (data) => {
        const { phone_number, password } = data;

        try {
            await handleLogin({ phone_number, password })
        } catch (err) {
            console.log(err);
            setFormError(err);
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative">
                    <input
                        {...register("phone_number", { required: true, maxLength: 80 })}
                        type="number"
                        id="phone_number"
                        className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                        placeholder=" "
                    />
                    <label htmlFor="phone_number" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Номер телефона</label>
                </div>

                <div className="relative">
                    <input
                        {...register("password", { required: true, maxLength: 80 })}
                        type="password"
                        id="password"
                        className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                        placeholder=" "
                    />
                    <label htmlFor="password" className="absolute text-[15px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Пароль</label>
                </div>
                <button disabled={!isValid} className="bg-accent py-4 rounded-base font-semibold text-[16px] text-white hover:bg-accentDark transition duration-300 disabled:bg-gray7 disabled:text-placeholder" type="submit">Войти</button>
            </form>
        </div>
    )
}

export default SigninForm;