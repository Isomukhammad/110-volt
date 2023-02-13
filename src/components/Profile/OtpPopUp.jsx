import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { authAxios } from '../../utils/axios';
import Button from '../Button/Button';
import FormError from '../Form/FormError';
import styles from './OtpPopUp.module.scss';

const PasswordPopUp = ({ setIsOpen, isOpen, register, handleSubmit }) => {
    const [formError, setFormError] = useState(null);

    if (isOpen) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = "scroll"
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const onSubmit = async (data) => {
        const phone = data.phone_number.replace(/\D/g, '');
        console.log(data);
        try {
            setFormError(null);
            const res = await authAxios.put('/profile/phone-number/update', {
                phone_number: phone,
                otp: data.otp
            })
            toast.success('Номер телефона изменен!');
            setIsOpen(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
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
            {
                isOpen ? (
                    <div className={styles.container} onClick={handleClose}>
                        <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                            <h1 className="">Подтверждение номера телефона</h1>
                            <div className={styles.form}>
                                <p>Код подтверждения отправлен на номер телефона</p>
                                <FormError error={formError} />
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="relative">
                                        <input
                                            {...register("otp", { required: true, maxLength: 80 })}
                                            type="number"
                                            id="otp"
                                            className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                                            placeholder=" "
                                        />
                                        <label htmlFor="otp" className="absolute text-[15px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-100 top-1.5 z-[1] origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Номер телефона</label>
                                    </div>
                                    <Button type="submit">Подтвердить</Button>
                                </form>
                            </div>
                            <button className={styles.closeButton} onClick={handleClose}>
                                <svg viewBox='0 0 24 24' className='w-6 h-6 fill-placeholder cursor-pointer'>
                                    <use xlinkHref='#close' />
                                </svg>
                            </button>
                        </div>
                    </div>
                ) : (null)
            }
        </>
    );
}

export default PasswordPopUp;