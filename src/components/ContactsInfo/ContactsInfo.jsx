import ContactUs from '../ContactUs/ContactUs';
import styles from './ContactsInfo.module.scss'

const ContactsInfo = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.contacts}>
                    <p>
                        <svg width={24} height={24} viewBox="0 0 24 24">
                            <use xlinkHref='#location'></use>
                        </svg>
                        Адрес: г.Ташкент, ул. А.Навои 24
                    </p>
                    <p>
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#7B54C9">
                            <use xlinkHref="#phone-handset" ></use>
                        </svg>
                        Колл-центр: + 998 (55) 501-56-56
                    </p>
                    <p>
                        <svg width={24} height={24} viewBox="0 0 24 24">
                            <use xlinkHref="#mail"></use>
                        </svg>
                        E-mail: info@110volt.uz
                    </p>
                </div >
                <div>
                    <ContactUs />
                </div>
            </div>
        </>
    )
}

export default ContactsInfo;