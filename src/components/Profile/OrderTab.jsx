import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLang } from "../../hooks/useLang";

import { authAxios } from "../../utils/axios";
import { thousandSeperate } from '../../utils/funcs';
import { getDate } from "../../utils/getDate";

import OrderedProduct from "./OrderedProduct";

import styles from './OrderTab.module.scss'

const OrderTab = ({ data }) => {
    const router = useRouter();
    const lang = useLang();
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState();
    const [createdAt, setCreatedAt] = useState(null);
    const handleItemsGet = async () => {
        try {
            setIsLoading(true);
            const items = await authAxios.get(`/orders/${data.id}/order-items`, {
                headers: { 'Accept-Language': router.locale }
            });
            setItems(items.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleItemsGet();
        const dateStart = new Date(data.created_at);
        const timestamp = dateStart.getTime();
        const date = getDate(timestamp, router.locale);
        setCreatedAt(date);
    }, [])

    if (isLoading) {
        return (<div>{lang?.['Загрузка…']}</div>)
    } else {
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.orderDate}>
                        <p className={styles.order}>{lang?.['Заказ']} #{data.id}</p>
                        <p className={styles.date}>{createdAt.month}, {createdAt.day}, {createdAt.year}</p>
                    </div>
                    <div className={styles.price}>{thousandSeperate(data.total)} {lang?.['сум']}</div>
                    <button onClick={() => router.push(`/profile/order/${data.id}`)}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <path d="M24 18C24.5523 18 25 17.5523 25 17C25 16.4477 24.5523 16 24 16C23.4477 16 23 16.4477 23 17C23 17.5523 23.4477 18 24 18Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M24 25C24.5523 25 25 24.5523 25 24C25 23.4477 24.5523 23 24 23C23.4477 23 23 23.4477 23 24C23 24.5523 23.4477 25 24 25Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M24 32C24.5523 32 25 31.5523 25 31C25 30.4477 24.5523 30 24 30C23.4477 30 23 30.4477 23 31C23 31.5523 23.4477 32 24 32Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </header>
                <main className={styles.orders}>
                    {
                        items.data.map((item) => (
                            <OrderedProduct key={item.id} data={item} />
                        ))
                    }
                    <div className={styles.priceMobile}>
                        <p>
                            {lang?.['Итого']}: {thousandSeperate(data.total)} {lang?.['сум']}
                        </p>
                    </div>
                </main>
            </div>
        )
    }
}

export default OrderTab;