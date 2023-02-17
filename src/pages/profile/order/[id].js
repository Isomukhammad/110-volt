import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import DiscountTabs from "../../../components/DiscountTabs/DiscountTabs";
import PagePath from "../../../components/PagePath/PagePath";
import PopularGoods from "../../../components/PopularGoods/PopularGoods";
import OrderedProduct from "../../../components/Profile/OrderedProduct";
import { useLang } from "../../../hooks/useLang";
import { authAxios } from "../../../utils/axios";
import { thousandSeperate } from "../../../utils/funcs";
import HeadInfo from "../../../utils/HeadInfo";

const OrderDetailsPage = () => {
    const router = useRouter();
    const lang = useLang();
    const [order, setOrder] = useState();
    const [items, setItems] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const id = router.query.id;

    const handleOrderGet = async () => {
        try {
            setIsLoading(true);
            const order = await authAxios.get(`orders/${id}`, {
                headers: { 'Accept-Language': router.locale }
            });
            setOrder(order.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleItemsGet = async () => {
        try {
            setIsLoading(true);
            const items = await authAxios.get(`/orders/${id}/order-items`, {
                headers: { 'Accept-Language': router.locale }
            });
            setItems(items.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleOrderGet();
        handleItemsGet();
    }, []);

    return (
        <>
            <HeadInfo title={lang?.['Детали заказа']} />
            <div className="mb-[120px]">
                <PagePath
                    paths={[
                        {},
                        {
                            "url": "/profile",
                            "name": lang?.['Мой аккаунт']
                        },
                        {
                            "name": lang?.['Мои заказы']
                        }
                    ]}
                />
                <h1 className="font-bold text-[24px] mt-10 lg:text-[32px]">{lang?.['Заказ']} #{router.query.id}</h1>
                {
                    isLoading ? (
                        <div>{lang?.['Загрузка…']}</div>
                    ) : (
                        <div className="flex flex-col gap-20 lg:grid lg:grid-cols-[70%_25%] justify-between mt-16 lg:mt-20">
                            <div className="flex flex-col gap-20 lg:gap-30">
                                <div className="flex flex-col gap-10">
                                    <div>
                                        {items?.map((item) => (
                                            <OrderedProduct key={item.id} data={item} />
                                        ))}
                                    </div>
                                    <hr />
                                    <div className="font-bold text-[20px] text-center lg:flex lg:gap-60 lg:justify-end"><span className="lg:text-[20px] lg:font-semibold lg:text-secondary">{lang?.['Итого']}:</span> <span>{thousandSeperate(order?.total)}</span></div>
                                </div>
                                <div className="mt-20 flex flex-col gap-10">
                                    <h1 className="font-bold text-[24px]">Указать личные данные</h1>
                                    <div className="flex flex-col gap-y-6">
                                        <h1 className="font-semibold text-[16px] text-secondary">{lang?.['Контактная информация']}</h1>
                                        <div className="flex flex-col gap-6 lg:max-w-[824px] lg:grid lg:grid-cols-2">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="text"
                                                    className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                                                    placeholder=" "
                                                    value={order?.name}
                                                    disabled
                                                />
                                                <label htmlFor="password" className="absolute text-[15px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Имя и Фамилия</label>
                                            </div>
                                            <div className='relative'>
                                                <PatternFormat
                                                    value={order?.phone_number}
                                                    format="+### (##) ### ## ##" allowEmptyFormatting mask=" "
                                                    id="phone_number"
                                                    className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                                                    placeholder=" "
                                                    disabled
                                                />
                                                <label htmlFor="phone_number" className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Номер телефона</label>
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="email"
                                                    value={order?.email}
                                                    className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                                                    placeholder=" "
                                                    disabled
                                                />
                                                <label htmlFor="email" className="absolute text-[15px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">E-mail</label>
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="text"
                                                    value={order?.address_line_1}
                                                    className="block py-4 px-[14px] w-full text-[15px] text-gray-900 bg-transparent rounded-[16px] border-1 border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent peer"
                                                    placeholder=" "
                                                    disabled
                                                />
                                                <label htmlFor="password" className="absolute text-[15px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-100 top-1.5 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-100 peer-focus:-translate-y-4 left-1 cursor-text">Адрес</label>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="font-medium text-[15px]"><span className="text-[#C0C0C0]">{lang?.['Метод доставки']}:</span> <span>{order?.shipping_method_title}</span></p>
                                </div>
                            </div>
                            <div className="p-8 bg-primaryBg rounded-[24px] flex flex-col gap-4 h-fit sticky top-8">
                                <div className="flex flex-col gap-8">
                                    <div className="flex flex-col gap-4">
                                        <h1 className="font-semibold text-[20px]">{lang?.['В корзине']}</h1>
                                        <p className="text-secondary font-medium text-[16px]">{(lang?.['{{number}} товаров']).replace('{{number}}', '3')}</p>
                                    </div>
                                    <p className="font-bold text-[24px]">{thousandSeperate(order?.total)} {lang?.['сум']}</p>
                                    <button className="py-4 rounded-[16px] bg-accent w-full font-semibold text-[16px] text-white hover:bg-accentDark transition duration-300">Оплатить</button>
                                </div>
                                <div className="flex flex-row gap-[10px] font-medium text-secondary">
                                    <svg viewBox="0 0 16 17" className="w-[32px] h-[34px] fill-none stroke-accent"><use xlinkHref="#tick-logo" /></svg>
                                    <p>{lang?.['Нажимая на кнопку “Оформить заказ” вы соглашаетесь у условиями Оферты']}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
                <PopularGoods title={lang?.['Популярные товары']} link="/products?is_popular-1" />
                <DiscountTabs />
            </div>
        </>
    )
}

export default OrderDetailsPage;