import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import Input from '../Input/Input';

import styles from './MsgCodeForm.module.scss'

const MsgCodeForm = () => {
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid
        },
        reset
    } = useForm();

    const onSubmit = (data) => alert(data);

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <label htmlFor="otp" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 z-[1] origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Код из СМС</label>
                </div>
                {
                    errors?.otp && <p className='text-red-500'>{errors?.otp?.message}</p>
                }
                <Button active={!isValid}>Войти</Button>
            </form>
        </div>
    )
}

export default MsgCodeForm;