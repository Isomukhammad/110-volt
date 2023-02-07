import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/auth';
import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';

import styles from './ProfileForm.module.scss';

const ProfileForm = () => {
    const [match, setMatch] = useState(true);
    const { user, userLoading } = useAuth();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid
        },
        reset
    } = useForm({
        mode: "onBlur"
    });

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        watch: watch2,
        formState: {
            errors: errors2,
            isValid: isValid2,
        },
        getValues,
        reset: reset2
    } = useForm({
        mode: "onChange"
    });

    const onSubmit = (data) => console.log(data);
    const onSubmitPassword = (data) => {
        console.log(data);
    }

    const handleConfirmPassword = (event) => {
        if (event.target.value) {
            if (getValues('newPassword') === event.target.value) {
                setMatch(true);
            } else {
                setMatch(false);
            }
        } else {
            setMatch(true)
        }
    }

    return (
        <div className={styles.container}>
            <h3>Личные данные</h3>
            <form
                className={styles.personalInfo}
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormInput
                    type='text'
                    name='name'
                    placeholder="Ваше имя"
                    register={register}
                    required="Введите своё имя!"
                    minLength="6"
                    maxLength="30"
                />
                <div className="relative">
                    <input
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Имя обязательно!'
                            }, maxLength: 80
                        })}
                        type="text"
                        id="name"
                        className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                        placeholder=" "
                    />
                    <label htmlFor="name" className="absolute text-[15px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Ваше имя</label>
                </div>
                <div className="relative">
                    <input
                        {...register("phone_number", { required: true, maxLength: 80 })}
                        type="number"
                        id="phone-number"
                        className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                        placeholder=" "
                    />
                    <label htmlFor="phone-number" className="absolute text-[15px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Номер телефона</label>
                </div>
                <FormInput
                    type='number'
                    name='mobile'
                    placeholder="Номер телефона"
                    register={register}
                    required="Введите свой номер телефона!"
                    minLength="6"
                    maxLength="20"
                />
                <FormInput
                    type='email'
                    name='email'
                    placeholder="E-mail"
                    register={register}
                    required="Введите ваш E-mail!"
                    minLength="6"
                    maxLength="30"
                />
                <Button type="submit" active={!isValid}>Сохранить изменения</Button>
            </form>

            <form
                className={styles.passwordInfo}
                onSubmit={handleSubmit(onSubmitPassword)}
            >
                <input
                    type='password'
                    name='oldPassword'
                    placeholder="Старый пароль"
                    {...register2("oldPassword", {
                        required: true,
                        maxLength: 20,
                        minLength: 6
                    })}
                />
                <input
                    type='password'
                    name='newPassword'
                    placeholder="Придумайте новый пароль"
                    {...register2("newPassword", {
                        required: true,
                        maxLength: 20,
                        minLength: 6
                    })}
                />
                <input
                    type='password'
                    name='confirmPassword'
                    placeholder="Подтвердите пароль"
                    {...register2("confirmPassword", {
                        required: true,
                        maxLength: 20,
                        minLength: 6,
                        onChange: (e) => { handleConfirmPassword(e) },
                    })}
                />
                {!match ? <p className={styles.passwordError}>Пароли не совпадают</p> : null}
                <Button
                    active={!isValid ===
                        !(getValues('newPassword') === getValues('confirmPassword'))
                    }
                    type="submit"
                >Сохранить изменения</Button>
            </form>
            <button className='bg-red-600 py-[12px] text-[16px] mt-10 text-white w-full max-w-[360px] rounded-[16px] font-semibold hover:bg-red-700 transition duration-300'>Удалить аккаунт</button>
        </div>
    )
}

export default ProfileForm;