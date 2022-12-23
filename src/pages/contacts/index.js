import ContactsInfo from '../../components/ContactsInfo/ContactsInfo';
import PagePath from '../../components/PagePath/PagePath'
import HeadInfo from '../../utils/HeadInfo';

import styles from './contacts.module.scss'

const ContactsPage = () => {
    return (
        <>
            <HeadInfo title="Наши контакты" />

            <div className={styles.container}>
                <PagePath category="Контакты" />
                <h1>Наши контакты</h1>
                <div className={styles.informations}>
                    <div>
                        <ContactsInfo />
                    </div>
                    <div>
                        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A14f7af4a8cb4a7e1f03d71f822ec528a05c8512cb0392b616d6f85bd84676f7d&amp;source=constructor"></iframe>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactsPage; 