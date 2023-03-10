import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLang } from '../../hooks/useLang';
import styles from './MobileBottomMenu.module.scss'

const MobileBottomMenu = () => {
    const router = useRouter();
    const lang = useLang();

    const disabledShadow = router.pathname === '/checkout' ? styles.disabled : '';

    return (
        <div className={`${styles.container} ${disabledShadow}`}>
            <div className={styles.wrapper}>
                <Link
                    href="/"
                    className={`${router.pathname === '/' ? styles.active : null}`}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="2"
                        stroke="#9499A5"
                    >
                        <use xlinkHref='#home'></use>
                    </svg>
                    <p>{lang?.['Главная']}</p>
                </Link>
                <Link
                    href="/wishes"
                    className={`${router.pathname === '/wishes' ? styles.wishes : null}`}
                >
                    <svg viewBox="0 0 24 24" width={24} height={24} fill="white" stroke="#9499A5" className={styles.languageButton}>
                        <use xlinkHref='#heart'></use>
                    </svg>
                    <p>{lang?.['Избранное']}</p>
                </Link>
                <Link
                    href="/cart"
                    className={`${router.pathname === '/cart' ? styles.cart : null}`}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <use xlinkHref={`${router.pathname === '/cart' ? '#bag-mobile-active' : '#bag-mobile'}`}></use>
                    </svg>
                    <p>{lang?.['Корзина']}</p>
                </Link>
                <Link
                    href="/profile"
                    className={`${router.pathname === '/profile' ? styles.profile : null}`}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <use xlinkHref={`${router.pathname === '/profile' ? '#profile-mobile-active' : '#profile-mobile'}`}></use>
                    </svg>
                    <p>{lang?.['Профиль']}</p>
                </Link>
            </div>
        </div>
    );
}

export default MobileBottomMenu;