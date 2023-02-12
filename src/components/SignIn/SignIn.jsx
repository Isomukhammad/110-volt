import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { useAuth } from '../../context/auth';
import { useCart } from '../../context/cart';
import FormError from '../Form/FormError';
import styles from './SignIn.module.scss'

const SignIn = () => {
    const [reqLoading, setReqLoading] = useState(false);
    const { handleLogin } = useAuth();
    const [formError, setFormError] = useState(null);
    const { getAndSetCart } = useCart();
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
        try {
            setReqLoading(true);
            setFormError(null);
            const phone_number = data.phone_number.replace(/\D/g, '');
            await handleLogin({ phone_number, password: data.password });
            getAndSetCart();
            reset();
        } catch (error) {
            setFormError(err?.response?.data)
            console.error(error);
        } finally {
            setReqLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <FormError error={formError} />
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <div className='relative'>
                    <PatternFormat  {...register("name", { required: true, maxLength: 80 })} format="+998 (##) ### ## ##" allowEmptyFormatting mask="_" id="name" className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer" placeholder=" " />
                    <label htmlFor="name" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Номер телефона</label>
                </div> */}
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

export default SignIn;