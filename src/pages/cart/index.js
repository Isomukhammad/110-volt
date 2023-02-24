import { useCart } from '../../context/cartContext';
import HeadInfo from '../../utils/headInfo';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import PagePath from '../../components/PagePath/PagePath'
import PopularGoods from '../../components/PopularGoods/PopularGoods';
import CartItem from '../../components/Cart/CartItem';
import CartTotal from '../../components/Cart/CartTotal';
import styles from './Cart.module.scss'

import { useLang } from '../../hooks/useLang';
import Empty from '../../components/Empty/Empty';
import Skeleton from 'react-loading-skeleton';

const CartPage = () => {
    const lang = useLang();
    const { cartLoading, cart, localCart, handleCart, cartReqLoading } = useCart();

    const store = cart || localCart;

    return (
        <>
            <HeadInfo title="Корзина" />
            <PagePath
                paths={[
                    {
                        "url": "",
                        "name": lang?.['Корзина']
                    }
                ]}
            />

            <div className={styles.container}>
                {
                    store && store.items.length < 1 ? (
                        <Empty
                            img="/images/Empty-amico 1.png"
                            title={lang?.['Здесь пока ничего нет']}
                            description={lang?.['Загляните а главую или воспользуйтесь поиском']}
                            btnUrl='/'
                            btnText={lang?.['Вернуться на главную']}
                        />
                    ) : (
                        <div className={styles.content}>
                            <h1 className={`${styles.title} font-bold text-[24px] md:text-[32px]`}>{lang ? lang?.['Корзина'] : <Skeleton width={300} />}</h1>

                            {!cartLoading && store ? (
                                <div className={styles.cart}>
                                    <div className={styles.cartItems}>
                                        {

                                            store.items.map((item) => (
                                                <CartItem key={item.id} item={item} />
                                            ))
                                        }
                                    </div>
                                    <div className={styles.cartTotal}>
                                        <CartTotal store={store} handleCart={handleCart} cartReqLoading={cartReqLoading} />
                                    </div>
                                </div>
                            ) : (
                                <div className='lg:grid lg:grid-cols-[75%_25%] gap-4'>
                                    <div className='rounded-[24px] overflow-hidden'><Skeleton height={400} /></div>
                                    <div className='hidden lg:block rounded-[24px] overflow-hidden'><Skeleton height={400} /></div>
                                </div>
                            )
                            }
                        </div>
                    )
                }
                <PopularGoods
                    title={lang?.['Популярные товары']} link="/products?is_popular-1&quantity=6"
                />
                <DiscountTabs />
            </div>
        </>
    )
}

export default CartPage;