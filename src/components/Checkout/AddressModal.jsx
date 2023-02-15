import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { useLang } from "../../hooks/useLang";
import { authAxios } from "../../utils/axios";
import fetcher from "../../utils/fetcher"
import Button from "../Button/Button";

const AddressModal = ({ setAddress, setAddressOpen }) => {
    const router = useRouter();
    const lang = useLang();
    const [addresses, setAddresses] = useState([]);

    // const { data: addresses, error: addressesError, isValidating } = useSWR(['/addresses'], (url) => fetcher(url))

    async function getAddresses() {
        try {
            authAxios.get('/addresses')
                .get(res => setAddress(res))
        } catch (error) {
            console.log(error);
        }
    }

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
        formState: { errors2 },
        reset: reset
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-[#00000040] z-[2] flex flex-col items-center justify-center"
            onClick={handleClose}
        >
            <div
                className="relative bg-white rounded-[24px] p-10 w-full max-w-[500px] m-2 flex flex-col gap-4"
                onClick={stopProp}
            >
                <h1 className="font-bold text-[24px]">{lang?.['Адрес доставки']}</h1>
                <div>
                    <form className="flex flex-row gap-1 w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative w-full">
                            <input
                                {...register2("address_line_1", { required: true, maxLength: 255 })}
                                type="text"
                                id="fullName"
                                className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer w-full"
                                placeholder=" "
                            />
                            <label htmlFor="fullName" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 z-[1] origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Введите ваш адрес</label>
                        </div>
                        <button type="submit" className="w-fit p-4 bg-accent rounded-[16px] text-white font-semibold">Добавить</button>
                    </form>
                </div>
                <button onClick={handleClose} className="absolute top-6 right-6">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-placeholder"><use xlinkHref="#close" /></svg>
                </button>
            </div>
        </div>
    );
}

export default AddressModal;