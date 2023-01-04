import Link from 'next/link';

import products from '../../products.json';

import Button from '../../components/Button/Button';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import ImageComponent from '../../components/ImageComponent/ImageComponent';
import PagePath from '../../components/PagePath/PagePath'
import PopularGoods from '../../components/PopularGoods/PopularGoods';

import HeadInfo from '../../utils/HeadInfo';

import styles from './Cart.module.scss'

const Cart = () => {
    console.log(products);

    return (
        <>
            <HeadInfo title="Корзина" />
            <PagePath
                paths={[
                    {
                        "url": "/",
                        "name": "Главная"
                    },
                    {
                        "url": "",
                        "name": `Корзина`
                    }
                ]}
            />
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.image}>
                        <ImageComponent
                            src={'/images/Empty-amico 1.png'}
                            alt=""
                        />
                    </div>
                    <h2>Здесь пока ничего нет</h2>
                    <p>Загляните а главую или воспользуйтесь поиском</p>
                    <Link href="/">
                        <Button>Вернуться на главную</Button>
                    </Link>
                    <div></div>
                </div>
                <PopularGoods
                    title="Популярные товары"
                />
                <DiscountTabs />
            </div>
        </>
    )
}

export default Cart;