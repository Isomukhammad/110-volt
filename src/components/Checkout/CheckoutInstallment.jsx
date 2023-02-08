import ImageDrop from '../ImageDrop/ImageDrop';
import styles from './CheckoutInstallment.module.scss';

const CheckoutInstallment = () => {

    return (
        <div className={styles.container}>
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
        </div>
    )
}

export default CheckoutInstallment;