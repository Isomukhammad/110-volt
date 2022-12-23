import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';
import FormTextarea from '../FormTextarea/Formtextarea';


import styles from './ContactUs.module.scss'

const ContactUs = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => console.log(data);

    return (
        <div className={styles.container}>
            <h2>Напишите нам</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    placeholder="Ваше имя..."
                    type='text'
                    name='name'
                    required
                    register={register}
                />
                <FormInput
                    placeholder="Номер телефона..."
                    type='number'
                    name='password'
                    required
                />
                <FormTextarea
                    placeholder="Ваше сообщение"
                    name="description"
                    required
                />
                <Button>Отправить</Button>
            </form>
        </div>
    )
}

export default ContactUs;