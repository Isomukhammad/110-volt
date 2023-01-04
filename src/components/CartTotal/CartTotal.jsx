import Button from '../Button/Button';
import styles from './CartTotal.module.scss'

const CartTotal = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.quantity}>
                    <h3>В корзине</h3>
                    <p>3 товара</p>
                </div>
                <h2 className={styles.price}>76 266 000 сум</h2>
                <div className={styles.buttons}>
                    <Button>Перейти к оформлению</Button>
                    <Button type="reverse">Купить в рассрочку</Button>
                </div>
            </div>
            <Button type="cart" active={true}>Добавить всё в избранное</Button>
            <Button type="cart">Очистить корзину</Button>
        </div>
    );
}

export default CartTotal;