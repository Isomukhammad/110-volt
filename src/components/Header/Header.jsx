import { useState } from 'react';

import Link from 'next/link';

import SearchInput from '../SearchInput/SearchInput';

import styles from './Header.module.scss';

import Menu from '../Menu/Menu';
import Image from 'next/image';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.container}>
            <div className={styles.information}>
                <div className={styles.contacts}>
                    <div className={styles.social}>
                        <svg width={16} height={16} fill="white">
                            <use xlinkHref='#instagram-logo'></use>
                        </svg>
                        <svg width={16} height={16} fill="white">
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
                <button className={styles.menuButton} onClick={() => { setMenuOpen(!menuOpen) }}>
                    <svg viewBox="0 0 24 24" className={styles.menuLogo}>
                        <use xlinkHref="#menu"></use>
                    </svg>
                </button>

                <Image src={'/images/CompanyLogo1.png'} alt="" width="0" height="0" sizes="100vw" className={styles.image} placeholder="blurDataURL" />

                <SearchInput placeholder={'Я ищу ...'} />
                <div className={styles.navButtons}>
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
                </div>
            </nav>
            {
                menuOpen ? <Menu /> : null
            }
        </header >
    )
}

export default Header;