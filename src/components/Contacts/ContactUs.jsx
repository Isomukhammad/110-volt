import { useForm } from 'react-hook-form';
import { nextAxios } from '../../utils/axios';

import Button from '../Button/Button';
import Input from '../Input/Input';
import FormTextarea from '../FormTextarea/Formtextarea';


import styles from './ContactUs.module.scss'
import { toast, ToastContainer } from 'react-toastify';

const ContactUs = () => {
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid
        },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        const phone = data.phone.replace(/\D/g, '');

        try {
            const res = await nextAxios.post('/feedback', {
                "name": data.name,
                "phone": phone,
                "message": data.message
            })
            toast.success('Сообщение отправлено!')
            reset();
        } catch (error) {
            console.error(error);
            toast.error('Что то пошло не так... Попробуйте чуть позже')
        }
    }

    return (
        <div className={styles.container}>
            <h2 className='font-bold text-[24px] lg:font-semibold lg:text-[20px]'>Напишите нам</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative">
                    <input
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Поле обязательно к заполнению!'
                            }
                        })}
                        type="text"
                        id="name"
                        className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                        placeholder=" "
                        maxLength={255}
                    />
                    <label htmlFor="name" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Ваше имя</label>
                </div>
                <div className="relative">
                    <input
                        {...register("phone", {
                            required: {
                                value: true,
                                message: 'Поле обязательно к заполнению!'
                            }
                        })}
                        type="text"
                        id="phone"
                        className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                        placeholder=" "
                        maxLength={255}
                    />
                    <label htmlFor="phone" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Номер телефона</label>
                </div>
                <div className="relative">
                    <textarea
                        {...register("message", {
                            required: {
                                value: true,
                                message: 'Поле обязательно к заполнению!'
                            }
                        })}
                        type="text"
                        id="message"
                        className="min-h-full block px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                        placeholder=" "
                        maxLength={10}
                    />
                    <label htmlFor="message" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-8 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Сообщение</label>
                </div>
                <Button type="submit" active={!isValid}>Отправить</Button>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    draggable
                    theme="light"
                />
            </form>
        </div>
    )
}

export default ContactUs;