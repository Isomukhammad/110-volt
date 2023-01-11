import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './MobileBottomMenu.module.scss'

const MobileBottomMenu = () => {
    const router = useRouter();
    return (
        <div className={styles.container}>
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
                <p>Главная</p>
            </Link>
            <Link
                href="/category/noutbuki"
                className={`${router.pathname.includes('category') ? styles.menu : null}`}
            >
                <svg
                    width="24"
                    height="24"
                    fill="#9499A5"
                    stroke="none"
                    viewBox="0 0 24 24"
                >
                    <use xlinkHref='#menu'></use>
                </svg>
                <p>Каталог</p>
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
                <p>Корзина</p>
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
                <p>Профиль</p>
            </Link>
        </div>
    );
}

export default MobileBottomMenu;