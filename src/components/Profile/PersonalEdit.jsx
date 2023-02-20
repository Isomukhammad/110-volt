import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLang } from '../../hooks/useLang';
import { toast, ToastContainer } from "react-toastify";

import { useAuth } from "../../context/authContext";
import { authAxios, nextAxios } from "../../utils/axios";

import Button from "../Button/Button";
import FormError from "../Form/FormError";
import Input from "../Input/Input";
import OtpPopUp from "./OtpPopUp";

import styles from './PersonalEdit.module.scss';
import { useRouter } from "next/router";

const PersonalEdit = () => {
    const router = useRouter();
    const lang = useLang();
    const { user: { name, phone_number, email }, userLoading } = useAuth();
    const [formError, setFormError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const { sendOtp } = useAuth();
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        formState: {
            errors,
            isValid,
            isDirty
        }
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name,
            phone_number,
            email
        }
    });

    const onSubmit = async (data) => {
        const phone = data.phone_number.replace(/\D/g, '');
        setIsDisabled(false);
        setIsLoading(true);
        try {
            if (phone_number !== phone) {
                const loginCheck = await nextAxios.post('/login/check', {
                    phone_number: phone
                })

                if (loginCheck.data.user_exists) {
                    return setFormError((prevError) => ({
                        ...prevError,
                        errors: {
                            logincheck: ['Пользователь с таким номером уже существует!'],
                        },
                    }))
                }

                await sendOtp({ phone_number: phone });

                setIsOpen(true);
            }

            if (name !== data.name || email !== data.email) {
                setFormError(null);

                await authAxios.put('/profile/update', {
                    name: data.name,
                    email: data.email,
                })

                toast.success('Информация о профиле изменена!');
            }
        } catch (error) {
            console.error(error);
            setFormError(error?.response?.data)
        } finally {
            setIsLoading(false);
            setIsDisabled(false);
        }
    };

    useEffect(() => {
        setIsDisabled(isDirty)
    }, [isDirty]);

    return (
        <>
            <div className="mt-3 mb-[-20px]">
                <FormError error={formError} />
            </div>
            <form
                className={styles.container}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    register={register}
                    required={true}
                    name="name"
                    type="text"
                    placeholder={lang?.['Ваше имя']}
                    max="255"
                    maxMsg={lang?.['Нужно ввести не более 255 символов']}
                />
                <div className="relative">
                    <input
                        {...register("phone_number", { required: true, maxLength: 80 })}
                        type="number"
                        id="phone-number"
                        className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                        placeholder=" "
                    />
                    <label htmlFor="phone-number" className="absolute text-[15px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Номер телефона</label>
                </div>
                <Input
                    register={register}
                    required={true}
                    name="email"
                    type="email"
                    placeholder={lang?.['E-mail']}
                    max={255}
                    maxMsg={lang?.['Нужно ввести не более 255 символов']}
                />
                <Button type="submit" active={!isDisabled} loading={isLoading} spinColor="#000000">Сохранить изменения</Button>
            </form>
            <OtpPopUp
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                register={register}
                handleSubmit={handleSubmit}
                control={control}
            />
        </>
    )
}

export default PersonalEdit;