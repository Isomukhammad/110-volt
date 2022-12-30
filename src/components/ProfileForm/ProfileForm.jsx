import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';

import styles from './ProfileForm.module.scss';

const ProfileForm = () => {
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
        formState: {
            errors: errors2,
            isValid: isValid2
        },
        reset: reset2
    } = useForm({
        mode: "onBlur"
    });

    return (
        <div className={styles.container}>
            <h3>Личные данные</h3>
            <form
                className={styles.personalInfo}
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
                {
                    errors?.name && <p className={styles.error}>{errors?.name?.message}</p>
                }
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
                {
                    errors?.mobile && <p className={styles.error}>{errors?.mobile?.message}</p>
                }
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
                {
                    errors?.email && <p className={styles.error}>{errors?.email?.message}</p>
                }
                <Button active={!isValid}>Сохранить изменения</Button>
            </form>

            <form
                className={styles.passwordInfo}
            >
                <FormInput
                    type='password'
                    name='oldPassword'
                    placeholder="Ваше имя"
                    register={register2}
                    required="Введите старый пароль!"
                    minLength="6"
                // maxLength="12"
                />
                <FormInput
                    type='password'
                    name='newPassword'
                    placeholder="Номер телефона"
                    register={register2}
                    required="Введите новый пароль!"
                    minLength="6"
                // maxLength="12"
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    placeholder="E-mail"
                    register={register2}
                    required="Подтвердите свой пароль!"
                    minLength="6"
                // maxLength="12"
                />
                <Button active={!isValid2}>Сохранить изменения</Button>
            </form>
        </div>
    )
}

export default ProfileForm;