import OrderedProduct from "../OrderedProduct/OrderedProduct";

import styles from './OrderTab.module.scss'

const OrderTab = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.orderDate}>
                    <p className={styles.order}>Заказ #8451166840</p>
                    <p className={styles.date}>Сентябрь, 30, 2022</p>
                </div>
                <div className={styles.price}>63 114 300 сум</div>
            </header>
            <main className={styles.orders}>
                <OrderedProduct />
                <OrderedProduct />
                <OrderedProduct />
            </main>
        </div>
    )
}

export default OrderTab;