import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useLang } from '../../hooks/useLang';
import { ScreenContext } from '../../context/screenContext';
import { thousandSeperate } from '../../utils/funcs';
import Button from '../Button/Button';
import styles from './CartTotal.module.scss'

const defaultIsLoading = [{
    id: 0,
    isLoading: false
}, {
    id: 1,
    isLoading: false
}, {
    id: 2,
    isLoading: false
}]

const CartTotal = ({ offer, store, handleCart, cartReqLoading }) => {
    const router = useRouter();
    const lang = useLang();
    const { isMobile, isTablet } = useContext(ScreenContext)
    const [isLoading, setIsLoading] = useState(defaultIsLoading);

    const handleInstalmentPush = () => {

        router.push('/checkout?instalment=1');
    }

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
                                        <Button>{lang?.['Оформить заказ']}</Button>
                                    </Link>
                                    <Link href='/checkout'>
                                        <Button variant="reverse">{lang?.['Купить в рассрочку']}</Button>
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
                        <h3 className='font-bold'>{lang?.['В корзине']}</h3>
                        {lang ? (<p>{(lang?.['{{number}} товаров']).replace("{{number}}", store.quantity)}</p>) : null}
                    </div>
                    <h2 className={styles.price}>{thousandSeperate(store.total)} {lang?.['сум']}</h2>
                    <div className={styles.actionButtons}>
                        {
                            router.pathname === '/checkout' ? (
                                <>
                                    <Button type="submit">Оформить заказ</Button>
                                    <Link href="/cart">
                                        <Button variant="reverse" tyle="button">{lang?.['Вернуться назад']}</Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/checkout" s>
                                        <Button>{lang?.['Перейти к оформлению']}</Button>
                                    </Link>
                                    <Button variant="cart" active={true} onClick={handleInstalmentPush}>{lang?.['Купить в рассрочку']}</Button>
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
                                {lang?.['Нажимая на кнопку “Оформить заказ” вы соглашаетесь у условиями Оферты']}<span onClick={() => router.push('/offer')}>Оферты</span>
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
                                <Button variant="cart" active={true}>Добавить всё в избранное</Button>
                                <div onClick={() => { handleCart({ type: 'CLEAR' }) }}>
                                    <Button
                                        variant="cart"
                                        type="button"
                                        loading={cartReqLoading.type == 'CLEAR'}
                                        spinColor="#7B54C9"
                                    >{lang?.['Очистить корзину']}</Button>
                                </div>
                            </div>
                        </>
                    )
                }
            </div >
        )
    }
}

export default CartTotal;