import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';
import styles from './SigninForm.module.scss'

const SigninForm = () => {
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
                <Button active={!isValid}>Войти</Button>
            </form>
        </div>
    )
}

export default SigninForm;