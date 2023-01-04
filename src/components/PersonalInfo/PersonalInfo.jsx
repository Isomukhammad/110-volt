import ConnectOption from '../ConnectOption/ConnectOption';
import styles from './PersonalInfo.module.scss'

const PersonalInfo = () => (
    <div className={styles.container}>
        <h1>Личный данные</h1>
        <div className={styles.contactInfo}>
            <div className={styles.category}>
                <h4>Контактная информация</h4>
                <div className={styles.personalInformation}>
                    <input
                        type="text"
                        placeholder='Имя и Фамилия' />
                    <input
                        type="text"
                        placeholder='Номер телефона' />
                    <input
                        type="text"
                        placeholder='E-mail' />
                    <input
                        type="text"
                        placeholder='Адресс' />
                </div>
            </div>
            <div className={styles.category}>
                <h4>Как с вами связаться</h4>
                <ConnectOption />
            </div>
            <div className={styles.category}>
                <h4>Метод оплаты</h4>
                <div className={styles.chosePayment}>
                    <div className={styles.column}>
                        <div className={styles.radio}>
                            <input
                                type="radio"
                                id="cash"
                                name="payment-method"
                                value="cash"
                            />
                            <label for="cash">Наличные</label>
                        </div>
                        <div className={styles.radio}>
                            <input
                                type="radio"
                                id="uzcard"
                                name="payment-method"
                                value="uzcard"
                            />
                            <label for="uzcard">Картой Uzcard</label>
                        </div>
                        <div className={styles.radio}>
                            <input
                                type="radio"
                                id="humo"
                                name="payment-method"
                                value="humo"
                            />
                            <label for="humo">Картой Humo</label>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.radio}>
                            <input
                                type="radio"
                                id="payme"
                                name="payment-method"
                                value="payme"
                            />
                            <label for="payme">Онлайн - PayMe</label>
                        </div>
                        <div className={styles.radio}>
                            <input
                                type="radio"
                                id="click"
                                name="payment-method"
                                value="click"
                            />
                            <label for="click">Онлайн - Click</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default PersonalInfo;