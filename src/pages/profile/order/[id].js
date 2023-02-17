import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PagePath from "../../../components/PagePath/PagePath";
import OrderedProduct from "../../../components/Profile/OrderedProduct";
import { useLang } from "../../../hooks/useLang";
import { authAxios } from "../../../utils/axios";
import HeadInfo from "../../../utils/HeadInfo";

const OrderDetailsPage = () => {
    const router = useRouter();
    const lang = useLang();
    const [order, setOrder] = useState();
    const [items, setItems] = useState();
    const [isLoading, setIsLoading] = useState();

    const handleOrderGet = async () => {
        try {
            setIsLoading(true);
            console.log(router.query.id);
            const order = await authAxios.get(`orders/${router.query.id}`, {
                headers: { 'Accept-Language': router.locale }
            });
            setOrder(order.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    // const handleItemsGet = async () => {
    //     try {
    //         setIsLoading(true);
    //         const items = await authAxios.get(`/orders/${router.query.id}/order-items`, {
    //             headers: { 'Accept-Language': router.locale }
    //         });
    //         setItems(items.data.data);
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    useEffect(() => {
        handleOrderGet();
        // handleItemsGet();
    }, []);

    // useEffect(() => {
    //     console.log(items);
    // }, [items])

    return (
        <>
            <HeadInfo title={lang?.['Детали заказа']} />
            <div className="">
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
                <h1 className="font-bold text-[24px] mt-10">{lang?.['Заказ']} #{router.query.id}</h1>
                {
                    isLoading ? (<div>{lang?.['Загрузка…']}</div>) : (
                        <div>
                            {/* {items.map((item) => (
                                <OrderedProduct key={item.id} items={item} />
                            ))} */}
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default OrderDetailsPage;