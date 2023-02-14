import { useData } from '../../context/dataContext';
import { useLang } from '../../hooks/useLang';
import ContactUs from './ContactUs';
import styles from './ContactsInfo.module.scss'

const ContactsInfo = () => {
    const lang = useLang();
    const { settings, settingsError } = useData();

    return (
        <>
            <div className={styles.container}>
                <div className={styles.contacts}>
                    <p>
                        <svg width={24} height={24} viewBox="0 0 24 24">
                            <use xlinkHref='#location'></use>
                        </svg>
                        {lang?.['Адрес']}: {settings?.address}
                    </p>
                    <p>
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#7B54C9">
                            <use xlinkHref="#phone-handset" ></use>
                        </svg>
                        {lang?.['Колл-центр']}: {settings?.phone}
                    </p>
                    <p>
                        <svg width={24} height={24} viewBox="0 0 24 24">
                            <use xlinkHref="#mail"></use>
                        </svg>
                        {lang?.['E-mail']}: {settings?.email}
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