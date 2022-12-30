import { useState } from 'react';
import { useRouter } from 'next/router';

import HeadInfo from '../../utils/HeadInfo';

import PagePath from '../../components/PagePath/PagePath'
import PopularGoods from '../../components/PopularGoods/PopularGoods';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import OrderTab from '../../components/OrderTab/OrderTab';

import styles from './Profile.module.scss';
import ProfileForm from '../../components/ProfileForm/ProfileForm';

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
                    <aside className={styles.sidebar}>
                        <section
                            onClick={() => setSection('profile')}
                            className={section === 'profile' ? styles.active : ''}
                        >
                            Профиль
                        </section>
                        <section
                            onClick={() => setSection('order')}
                            className={section === 'order' ? styles.active : ''}
                        >
                            Мои заказы
                        </section>
                        <section
                            onClick={handleClick}
                        >
                            Выйти из аккунта
                        </section>
                    </aside>

                    {
                        section === 'profile' ? (
                            <ProfileForm />
                        ) : (
                            <main className={styles.orders}>
                                <OrderTab />
                                <OrderTab />
                                <OrderTab />
                            </main>
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