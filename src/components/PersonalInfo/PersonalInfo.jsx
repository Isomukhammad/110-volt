import { useState } from 'react';

import ConnectOption from '../ConnectOption/ConnectOption';
import FormTextarea from '../FormTextarea/Formtextarea';
import ImageDrop from '../ImageDrop/ImageDrop';

import styles from './PersonalInfo.module.scss'

const PersonalInfo = () => {
    const [method, setMethod] = useState('immediately');

    return (
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
                    <h4>Тип заказа</h4>
                    <div className={styles.orderType}>
                        <button
                            className={`${styles.buyNow} ${method === 'immediately' ? styles.active : ''}`}
                            onClick={() => setMethod('immediately')}
                        >Купить сразу</button>
                        <button
                            className={`${styles.installment} ${method === 'instalment' ? styles.active : ''}`}
                            onClick={() => setMethod('instalment')}
                        >Купить в рассрочку</button>
                    </div>
                </div>
                <div className={`${styles.category} ${method !== 'immediately' ? styles.immediately : ''}`}>
                    {
                        method === 'immediately' ? (
                            <>
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
                                            <label htmlFor="cash">Наличные</label>
                                        </div>
                                        <div className={styles.radio}>
                                            <input
                                                type="radio"
                                                id="uzcard"
                                                name="payment-method"
                                                value="uzcard"
                                            />
                                            <label htmlFor="uzcard">Картой Uzcard</label>
                                        </div>
                                        <div className={styles.radio}>
                                            <input
                                                type="radio"
                                                id="humo"
                                                name="payment-method"
                                                value="humo"
                                            />
                                            <label htmlFor="humo">Картой Humo</label>
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
                                            <label htmlFor="payme">Онлайн - PayMe</label>
                                        </div>
                                        <div className={styles.radio}>
                                            <input
                                                type="radio"
                                                id="click"
                                                name="payment-method"
                                                value="click"
                                            />
                                            <label htmlFor="click">Онлайн - Click</label>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={styles.instalment}>
                                    <h4>Оформление рассрочки</h4>
                                    <div className={styles.cardInfo}>
                                        <input
                                            type='number'
                                            placeholder='Номер телефона привязанного к карте'
                                        />
                                        <input
                                            type='number'
                                            placeholder="Номер карты"
                                        />
                                        <input
                                            type="number"
                                            placeholder='Срок действия карты'
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.instalment} ${styles.file}`}>
                                    <h4>Фото пасспорта</h4>
                                    <ImageDrop image="/images/Passport.png" />
                                </div>
                                <div className={`${styles.instalment} ${styles.file}`}>
                                    <h4>Селфи с пасспортом</h4>
                                    <ImageDrop image="/images/selfie with passport 1.png" />
                                </div>
                                <div className={`${styles.instalment} ${styles.file}`}>
                                    <h4>Страница прописки</h4>
                                    <ImageDrop image="/images/Propiska.png" />
                                </div>
                                <div className={`${styles.instalment} ${styles.wishes}`}>
                                    <h4>Ваши пожелание</h4>
                                    <textarea
                                        name="" id=""
                                        cols="30"
                                        rows="10"
                                        placeholder='Сообщение'
                                    ></textarea>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo;