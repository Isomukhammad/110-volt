import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../../context/auth';
import HeadInfo from '../../utils/HeadInfo';

import PagePath from '../../components/PagePath/PagePath'
import ProfileForm from '../../components/Profile/ProfileForm';
import OrderTab from '../../components/Profile/OrderTab';
import PopularGoods from '../../components/PopularGoods/PopularGoods';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';

import styles from './Profile.module.scss';
import { toast, ToastContainer } from 'react-toastify';
import { useLang } from '../../hooks/useLang';

const ProfilePage = () => {
    const router = useRouter();
    const lang = useLang();
    const [section, setSection] = useState('profile');
    const { handleLogout } = useAuth()

    useEffect(() => {
        if (router.query.section === 'orders') {
            setSection('orders');
        }
    }, [router]);

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
                <div className={`${styles.content} ${section === 'orders' ? styles.space : ''}`}>
                    <div className={styles.sidebar}>
                        <div
                            onClick={() => setSection('profile')}
                            className={`${styles.section} ${section === 'profile' ? styles.active : ''}`}
                        >
                            Профиль
                        </div>
                        <div
                            onClick={() => setSection('orders')}
                            className={`${styles.section} ${section === 'orders' ? styles.active : ''}`}
                        >
                            Мои заказы
                        </div>
                        <div
                            className={styles.section}
                            onClick={handleLogout}
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
                <PopularGoods title={lang?.['Популярные товары']} link="/products?is_popular-1&quantity=6" />
                <DiscountTabs />
            </div>
        </>
    )
}

ProfilePage.requireAuth = true

export default ProfilePage;