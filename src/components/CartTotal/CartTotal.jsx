import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../Button/Button';
import styles from './CartTotal.module.scss'

const CartTotal = ({ offer }) => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.quantity}>
                    <h3>В корзине</h3>
                    <p>3 товара</p>
                </div>
                <h2 className={styles.price}>76 266 000 сум</h2>
                <div className={styles.buttons}>
                    <Link href="/checkout">
                        <Button>Перейти к оформлению</Button>
                    </Link>
                    <Button type="reverse">Купить в рассрочку</Button>
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
            <Button type="cart" active={true}>Добавить всё в избранное</Button>
            <Button type="cart">Очистить корзину</Button>
        </div>
    );
}

export default CartTotal;