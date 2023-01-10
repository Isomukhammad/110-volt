import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { ScreenContext } from '../../context/screenContext';
import Button from '../Button/Button';
import styles from './CartTotal.module.scss'

const CartTotal = ({ offer }) => {
    const router = useRouter();
    const { isMobile, isTablet } = useContext(ScreenContext)

    useEffect(() => {
        console.log(isTablet);
        console.log(isMobile)
    }, [isMobile, isTablet])

    if (isMobile) {
        return (
            <div className={styles.bottomTotal}>
                <div className={styles.content}>
                    <div className={styles.prices}>
                        <p>3 товара</p>
                        <h4>75 266 000 cум</h4>
                    </div>
                    <Button>Заказать</Button>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.totalContainer}>
                <div className={styles.content}>
                    <div className={styles.quantity}>
                        <h3>В корзине</h3>
                        <p>3 товара</p>
                    </div>
                    <h2 className={styles.price}>76 266 000 сум</h2>
                    <div className={styles.actionButtons}>
                        {
                            router.pathname === '/checkout' ? (
                                <>
                                    <Link href="/checkout">
                                        <Button>Оформить заказ</Button>
                                    </Link>
                                    <Link href="/cart">
                                        <Button type="reverse">Назад</Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/checkout">
                                        <Button>Перейти к оформлению</Button>
                                    </Link>
                                    <Button type="reverse">Купить в рассрочку</Button>
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
                                <Button type="cart">Очистить корзину</Button>
                            </div>
                        </>
                    )
                }
            </div>
        )
    }
}

export default CartTotal;