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
                <FormInput
                    type='number'
                    name='number'
                    placeholder="Номер телефона..."
                    register={register}
                    required="Поле выше обязательно к заполнению!"
                />
                <FormTextarea
                    placeholder="Ваше сообщение"
                    name="description"
                    register={register}
                    required="Поле выше обязательно к заполнению!"
                />
                <Button>Отправить</Button>
            </form>
        </div>
    )
}

export default ContactUs;