import Link from 'next/link';
import CompanyLogo from '../../public/icons/d_logo.svg';
import TelegramLogo from '../../public/icons/telegram.svg'
import InstagramLogo from '../../public/icons/instagram.svg'
import Search from '../Search/Search';

import styles from './Header.module.scss';

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.information}>
                <div className={styles.contacts}>
                    <div className={styles.social}>
                        <InstagramLogo />
                        <TelegramLogo />
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

            <div className={styles.actions}>
                <svg viewBox="0 0 24 24" className={styles.menuButton}>
                    <use xlinkHref="#menu"></use>
                </svg>
                <CompanyLogo />
                <Search placeholder={'Я ищу ...'} />
                <div>
                    <svg viewBox="0 0 21 22" fill="none" className={styles.languageButton}>
                        <use xlinkHref='#language-logo'></use>
                    </svg>
                    <p>Русский</p>
                </div>
                <div>
                    <svg viewBox="0 0 21 22" fill="none" className={styles.languageButton}>
                        <use xlinkHref='#bag-logo'></use>
                    </svg>
                    <p>Корзина</p>
                </div>
                <div>
                    <svg viewBox="0 0 21 22" fill="none" className={styles.languageButton}>
                        <use xlinkHref='#profile-logo'></use>
                    </svg>
                    <p>Войти</p>
                </div>
            </div>
            <div></div>
        </div >
    )
}

export default Header;