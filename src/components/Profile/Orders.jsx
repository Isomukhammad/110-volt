import { useEffect, useState } from "react";
import { authAxios } from "../../utils/axios";
import { useRouter } from "next/router";
import { useLang } from '../../hooks/useLang';

import OrderTab from "./OrderTab";

import styles from './Orders.module.scss';

const Orders = () => {
    const router = useRouter();
    const lang = useLang();
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState();

    const handleOrdersGet = async () => {
        try {
            setIsLoading(true);
            const orders = await authAxios.get('/orders', {
                headers: { 'Accept-Language': router.locale }
            });
            setOrders(orders.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleOrdersGet();
    }, []);

    if (isLoading) {
        return (<div>{lang?.['Загрузка…']}</div>)
    } else {
        return (
            <div className={styles.container}>
                {
                    orders.data.map((order) => (
                        <OrderTab key={order.id} data={order} />
                    ))
                }
            </div>
        );
    }
}

export default Orders;