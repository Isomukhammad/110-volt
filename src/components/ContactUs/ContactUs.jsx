import { useForm } from 'react-hook-form';

import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';
import FormTextarea from '../FormTextarea/Formtextarea';


import styles from './ContactUs.module.scss'

const ContactUs = () => {
    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
        reset
    } = useForm();
    console.log(errors);

    const onSubmit = data => console.log(data);

    return (
        <div className={styles.container}>
            <h2>Напишите нам</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type='text'
                    name='name'
                    placeholder="Ваше имя..."
                    register={register}
                    required="Поле выше обязательно к заполнению!"
                />
                <div className={styles.error}>
                    {
                        errors?.name && <p>{errors?.name?.message}</p>
                    }
                </div>
                <FormInput
                    type='number'
                    name='number'
                    placeholder="Номер телефона..."
                    register={register}
                    required="Поле выше обязательно к заполнению!"
                />
                <div className={styles.error}>
                    {
                        errors?.number && <p>{errors?.number?.message}</p>
                    }
                </div>
                <FormTextarea
                    placeholder="Ваше сообщение"
                    name="description"
                    register={register}
                    required="Поле выше обязательно к заполнению!"
                />
                <div className={styles.error}>
                    {
                        errors?.description && <p>{errors?.description?.message}</p>
                    }
                </div>
                <Button>Отправить</Button>
            </form>
        </div>
    )
}

export default ContactUs;