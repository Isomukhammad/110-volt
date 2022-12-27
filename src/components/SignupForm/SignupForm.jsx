import { useForm } from 'react-hook-form';

import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';

import styles from './Signup.module.scss'

const SignupForm = () => {
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

    const onSubmit = (data) => console.log(data);
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type='text'
                    name='name'
                    placeholder="Имя и фамилия"
                    register={register}
                    required="Введите своё имя и фамилию!"
                    minLength="6"
                    maxLength="12"
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
                    maxLength="12"
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
                    required="Введите свой почтовый адрес!"
                    error={errors?.email}
                />

                {
                    errors?.email && <p className={styles.error}>{errors?.email?.message}</p>
                }

                <FormInput
                    type='password'
                    name='password'
                    placeholder="Пароль"
                    register={register}
                    minLength="6"
                    maxLength="12"
                    required="Введите свой пароль!"
                    error={errors?.password}
                />

                {
                    errors?.password && <p className={styles.error}>{errors?.password?.message}</p>
                }

                <FormInput
                    type='password'
                    name='confirmPassword'
                    placeholder="Подтвердите пароль"
                    register={register}
                    required="Подтвердите ваш пароль!"
                    error={errors?.confirmPassword}
                />
                {
                    errors?.confirmPassword && <p className={styles.error}>{errors?.confirmPassword?.message}</p>
                }
                <Button active={!isValid}>Войти</Button>
            </form>
        </div>
    )
}

export default SignupForm;