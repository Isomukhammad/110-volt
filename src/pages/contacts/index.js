import ContactsInfo from '../../components/ContactsInfo/ContactsInfo';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import PagePath from '../../components/PagePath/PagePath'
import { useData } from '../../context/dataContext';
import HeadInfo from '../../utils/HeadInfo';

import styles from './contacts.module.scss'

const ContactsPage = () => {
    const { settings, settingsVal } = useData();

    if (!settingsVal) {
        return (
            <>
                <HeadInfo title="Наши контакты" />

                <div className={styles.container}>
                    <PagePath
                        paths={[
                            {
                                "url": "/",
                                "name": "Главная"
                            },
                            {
                                "url": "",
                                "name": `Контакты`
                            }
                        ]}
                    />
                    <h1>Наши контакты</h1>
                    <div className={styles.informations}>
                        <div className={styles.contactInfo}>
                            <ContactsInfo />
                        </div>

                        <div className={styles.map} dangerouslySetInnerHTML={{ __html: settings.map }} />
                    </div>
                    <div className={styles.dicountTab}>
                        <DiscountTabs />
                    </div>
                </div>
            </>
        )
    }
}

export default ContactsPage; 