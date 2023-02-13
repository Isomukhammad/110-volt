import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { authAxios } from "../../utils/axios";

import Button from "../Button/Button";
import FormError from "../Form/FormError";

import styles from './PasswordEdit.module.scss';

const ProfilePassword = () => {
    const [formError, setFormError] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register: register,
        handleSubmit: handleSubmit,
        formState: {
            errors: errors,
            isValid: isValid,
        },
        getValues,
        reset
    } = useForm({
        mode: "onChange",
        defaultValues: {
            current_password: '',
            new_password: '',
            confirm_password: '',
        },
    });

    useEffect(() => {
        setIsDisabled(isValid)
    }, [isValid]);

    const onSubmit = async (data) => {
        setIsDisabled(false);
        setIsLoading(true);
        if (isValid) {
            try {
                setFormError(null);

                if (data.new_password !== data.confirm_password) {
                    return setFormError((prevVal) => ({
                        ...prevVal,
                        errors: {
                            password: ['Пароли не совпадают!'],
                        }
                    }))
                }

                await authAxios.put('/profile/password/update', {
                    current_password: data.current_password,
                    new_password: data.new_password,
                })

                toast.success('Пароль изменён!');
                reset();
            } catch (error) {
                console.error(error);
                setFormError(error?.response?.data)
            } finally {
                setIsDisabled(true);
                setIsLoading(false);
            }
        }
    }

    return (
        <>
            <form
                className={styles.container}
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormError error={formError} />
                <div className="relative">
                    <input
                        {...register("current_password", {
                            required: true,
                            maxLength: 20,
                            minLength: 6
                        })}
                        type="password"
                        id="current-password"
                        className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                        placeholder=" "
                        maxLength={255}
                    />
                    <label htmlFor="current-password" className="absolute text-[15px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Старый пароль</label>
                </div>
                <div className="relative">
                    <input
                        {...register("new_password", {
                            required: true,
                            maxLength: 20,
                            minLength: 6
                        })}
                        type="password"
                        id="new-password"
                        className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                        placeholder=" "
                        maxLength={255}
                    />
                    <label htmlFor="new-password" className="absolute text-[15px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Придумайте новый пароль</label>
                </div>
                <div className="relative">
                    <input
                        {...register("confirm_password", {
                            required: true,
                            maxLength: 20,
                            minLength: 6
                        })}
                        type="password"
                        id="confirm-password"
                        className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                        placeholder=" "
                        maxLength={255}
                    />
                    <label htmlFor="confirm-password" className="absolute text-[15px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-100 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Подтвердите пароль</label>
                </div>
                <Button
                    active={!isDisabled}
                    loading={isLoading}
                    spinColor="#000000"
                    type="submit"
                >Сохранить изменения</Button>
            </form>
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
        </>
    )
}

export default ProfilePassword; 