import { useState } from 'react';
import { useRouter } from 'next/router';

import HeadInfo from '../../utils/HeadInfo';

import PagePath from '../../components/PagePath/PagePath'
import PopularGoods from '../../components/PopularGoods/PopularGoods';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import OrderTab from '../../components/OrderTab/OrderTab';
import ProfileForm from '../../components/ProfileForm/ProfileForm';

import styles from './Profile.module.scss';

const ProfilePage = () => {
    const [section, setSection] = useState('profile');

    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault()
        router.push('/')
    }

    return (
        <>
            <HeadInfo title="Профиль" />
            <div className={styles.container}>
                <PagePath
                    paths={[
                        {
                            "url": "",
                            "name": "Главная"
                        },
                        {
                            "url": "",
                            "name": "Мой аккаунт"
                        }
                    ]}
                />
                <h1>Мой аккаунт</h1>

                <div className={`${styles.content} ${section === 'order' ? styles.space : ''}`}>
                    <div className={styles.sidebar}>
                        <div
                            onClick={() => setSection('profile')}
                            className={`${styles.section} ${section === 'profile' ? styles.active : ''}`}
                        >
                            Профиль
                        </div>
                        <div
                            onClick={() => setSection('order')}
                            className={`${styles.section} ${section === 'order' ? styles.active : ''}`}
                        >
                            Мои заказы
                        </div>
                        <div
                            className={styles.section}
                            onClick={handleClick}
                        >
                            Выйти из аккунта
                        </div>
                    </div>

                    {
                        section === 'profile' ? (
                            <ProfileForm />
                        ) : (
                            <div className={styles.orders}>
                                <OrderTab />
                                <OrderTab />
                                <OrderTab />
                            </div>
                        )
                    }
                </div>
                <PopularGoods title={'Популярные товары'} />
                <DiscountTabs />
            </div>
        </>
    )
}

export default ProfilePage;