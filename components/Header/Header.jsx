import Link from 'next/link';

import SearchInput from '../SearchInput/SearchInput';

import CompanyLogo from '../../public/icons/d_logo.svg';

import styles from './Header.module.scss';

const Header = () => {
    return (
        <header className={styles.container}>
            <div className={styles.information}>
                <div className={styles.contacts}>
                    <div className={styles.social}>
                        <svg width={16} height={16}>
                            <use xlinkHref='#instagram-logo'></use>
                        </svg>
                        <svg width={16} height={16}>
                            <use xlinkHref='#telegram-logo'></use>
                        </svg>
                    </div>
                    <p>+998 (55) 501 56 56</p>
                </div>

                <div className={styles.categories}>
                    <Link href="/">Электроника</Link>
                    <Link href="/">Компьютерная техника</Link>
                    <Link href="/">Бытовая техника</Link>
                    <Link href="/">Красота и здоровье</Link>
                    <Link href="/">Кухонная техника</Link>
                    <Link href="/">Мебель</Link>
                </div>
            </div>

            <nav className={styles.navigation}>
                <button className={styles.menuButton}>
                    <svg viewBox="0 0 24 24" className={styles.menuLogo}>
                        <use xlinkHref="#menu"></use>
                    </svg>
                </button>
                <CompanyLogo />
                <SearchInput placeholder={'Я ищу ...'} />
                <div className={styles.navButton}>
                    <svg viewBox="0 0 21 22" fill="none" className={styles.languageButton}>
                        <use xlinkHref='#language-logo'></use>
                    </svg>
                    <p>Русский</p>
                </div>
                <div className={styles.navButton}>
                    <svg viewBox="0 0 21 22" fill="none" className={styles.languageButton}>
                        <use xlinkHref='#bag-logo'></use>
                    </svg>
                    <p>Корзина</p>
                </div>
                <div className={styles.navButton}>
                    <svg viewBox="0 0 21 22" fill="none" className={styles.languageButton}>
                        <use xlinkHref='#profile-logo'></use>
                    </svg>
                    <p>Войти</p>
                </div>
            </nav>
            <div></div>
        </header >
    )
}

export default Header;