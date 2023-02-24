import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useLang } from "../../hooks/useLang";
import { authAxios } from "../../utils/axios";
import Button from "../Button/Button";

const AddressModal = ({ addressOpen, register, setAddress, setAddressOpen }) => {
    const router = useRouter();
    const lang = useLang();
    const [formError, setFormError] = useState(null);
    const [addresses, setAddresses] = useState();
    const [chosen, setChosen] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setAddressOpen(false);
    }

    const stopProp = (e) => {
        e.stopPropagation();
    }

    const {
        register: register2,
        handleSubmit: handleSubmit,
        control,
        formState: {
            errors,
            isValid: isValid2,
        },
        reset: reset2
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setFormError(null);
            const res = await authAxios.post('/addresses', {
                address_line_1: data.address
            });
            toast.success('Адрес добавлен');
            handleAddressGet();
            reset2();
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddressGet = async () => {
        try {
            setIsLoading(true);
            const res = await authAxios.get('/addresses');
            setAddresses(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleAddressDelete = async (id) => {
        if (id == chosen) {
            toast.error('Вы не можете удалить активный адрес. Сначала выберите другой!')
        } else {
            try {
                setIsLoading(true);
                const res = await authAxios.delete(`addresses/${id}`);
                handleAddressGet();
                toast.info(lang?.['Адрес удален'])
            } catch (error) {
                toast.error(lang?.['Что-то пошло не так ☹️'])
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        handleAddressGet();
    }, [])

    return (
        <div
            className={`${addressOpen ? 'flex' : 'hidden'} AddressModal fixed z-[100] top-0 left-0 w-full h-full bg-[#00000040] flex flex-col items-center justify-center`}
            onClick={handleClose}
        >
            <div
                className="AddressModal__wrapper relative bg-white rounded-[24px] py-16 px-10 w-[90%] lg:max-w-[520px] flex flex-col gap-4"
                onClick={stopProp}
            >
                <div className="AddressModal__content flex flex-col gap-12">
                    <h1 className="AddressModal__headline font-semibold text-[24px] text-center">{lang?.['Выберите адрес']}</h1>
                    {
                        addresses && !isLoading ? (
                            <div className="AddressModal__content__addresses flex flex-col gap-4 max-h-[300px]">
                                {
                                    addresses.map((item) => (
                                        <div className="AddressModal__address flex flex-row justify-between py-3" key={item.id}>
                                            <div>
                                                <input
                                                    type="radio"
                                                    id={`address-${item.id}`}
                                                    name="address-id"
                                                    value={item.id}
                                                    className='focus:ring-transparent'
                                                    {...register('address_id', { required: true, maxLength: 500 })}
                                                    onClick={() => {
                                                        setChosen(item.id);
                                                        setAddress(item.address_line_1)
                                                    }}
                                                />
                                                <label className="font-medium text-[15px]" htmlFor={`address-${item.id}`}>{item.address_line_1}</label>
                                            </div>
                                            <button
                                                onClick={() => handleAddressDelete(item.id)}
                                            >
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    className="w-6 h-6 stroke-placeholder fill-none transition duration-300 hover:stroke-red-600"
                                                ><use xlinkHref="#trash" /></svg>
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (<div>{lang?.['Загрузка…']}</div>)
                    }
                    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative w-full">
                            <input
                                {...register2("address", { required: true, minLength: 3, maxLength: 500 })}
                                type="text"
                                id="fullName"
                                className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                                placeholder=" "
                            />
                            <label htmlFor="fullName" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">{lang?.['Новый адрес']}</label>
                        </div>
                        <Button active={!isValid2} type="submit">{lang?.['Добавить']}</Button>
                    </form>
                </div>
                <button onClick={handleClose} className="absolute top-6 right-6 flex flex-col items-center justify-center" disabled={true}>
                    <svg viewBox="0 0 32 32" className="w-[32px] h-[32px] fill-placeholder scale-[1.4]"><use xlinkHref="#close" /></svg>
                </button>
            </div>
        </div>
    );
}

export default AddressModal;