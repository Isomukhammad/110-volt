import { useEffect, useState } from "react";
import { authAxios } from "../../utils/axios";
import { useRouter } from "next/router";
import { useLang } from '../../hooks/useLang';

import OrderTab from "./OrderTab";

import styles from './Orders.module.scss';
import Skeleton from "react-loading-skeleton";

const Orders = () => {
    const router = useRouter();
    const lang = useLang();
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState();

    useEffect(() => {
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

        handleOrdersGet();
    }, [router.locale]);

    if (isLoading) {
        return (<div><Skeleton height={500} /></div>)
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