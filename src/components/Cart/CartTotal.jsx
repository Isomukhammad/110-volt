import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { ScreenContext } from '../../context/screenContext';
import { thousandSeperate } from '../../utils/funcs';
import Button from '../Button/Button';
import styles from './CartTotal.module.scss'

const CartTotal = ({ offer, store, handleCart, handleSubmit, onSubmit }) => {
    console.log('HandleSubmit:', handleSubmit);
    console.log('onSubmit', onSubmit);
    const router = useRouter();
    const { isMobile, isTablet } = useContext(ScreenContext)

    if (isMobile || isTablet) {
        return (
            <div className={styles.bottomTotal}>
                <div className={styles.content}>
                    <div className={styles.prices}>
                        <p>{store.quantity} {store.quantity === 1 ? 'товар' : 'товара'}</p>
                        <h4 className='font-bold text-[20px]'>{thousandSeperate(store.total)} cум</h4>
                    </div>

                    {
                        router.pathname === '/cart' ? (
                            <>
                                <div className={styles.bottomButtons}>
                                    <Link href='/checkout'>
                                        <Button>Оформить заказ</Button>
                                    </Link>
                                    <Link href='/checkout'>
                                        <Button variant="reverse">Рассрочка</Button>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <Link href='/checkout'>
                                <Button>Заказать</Button>
                            </Link>
                        )
                    }

                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.totalContainer}>
                <div className={styles.content}>
                    <div className={styles.quantity}>
                        <h3 className='font-bold'>В корзине</h3>
                        <p>{store.quantity} {store.quantity === 1 ? 'товар' : 'товара'}</p>
                    </div>
                    <h2 className={styles.price}>{thousandSeperate(store.total)} сум</h2>
                    <div className={styles.actionButtons}>
                        {
                            router.pathname === '/checkout' ? (
                                <>
                                    <Button type="submit">Оформить заказ</Button>
                                    <Link href="/cart">
                                        <Button variant="reverse" tyle="button">Назад</Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/checkout">
                                        <Button>Перейти к оформлению</Button>
                                    </Link>
                                    <Button variant="reverse">Купить в рассрочку</Button>
                                </>
                            )
                        }
                    </div>
                    {
                        offer ? <div className={styles.offer}>
                            <svg
                                viewBox='0 0 16 17'
                                width={16}
                                height={17}
                                fill="none"
                                stroke="#7B54C9"
                            >
                                <use xlinkHref='#tick-logo'></use>
                            </svg>
                            <p>
                                Нажимая на кнопку “Оформить заказ” вы соглашаетесь c условиями <span onClick={() => router.push('/offer')}>Оферты</span>
                            </p>
                        </div> : null
                    }
                </div>
                {
                    router.pathname === '/checkout' ? (
                        null
                    ) : (
                        <>
                            <div className={styles.cartButtons}>
                                <Button type="cart" active={true}>Добавить всё в избранное</Button>
                                <div onClick={() => { handleCart({ type: 'CLEAR' }) }}>
                                    <Button type="cart">Очистить корзину</Button>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        )
    }
}

export default CartTotal;