import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';

import styles from './ProfileForm.module.scss';

const ProfileForm = () => {
    const [match, setMatch] = useState(true);

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
                    error={errors?.name}
                />
                <FormInput
                    type='number'
                    name='mobile'
                    placeholder="Номер телефона"
                    register={register}
                    required="Введите свой номер телефона!"
                    minLength="6"
                    maxLength="20"
                    error={errors?.mobile}
                />
                <FormInput
                    type='email'
                    name='email'
                    placeholder="E-mail"
                    register={register}
                    required="Введите ваш E-mail!"
                    minLength="6"
                    maxLength="30"
                    error={errors?.email}
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
        </div>
    )
}

export default ProfileForm;