import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import SearchInput from '../SearchInput/SearchInput';

import styles from './Header.module.scss';

import Menu from '../Menu/Menu';
import Image from 'next/image';

const Header = () => {
    const ref = useRef(false)
    const [firstOpen, setFirstOpen] = useState(false); //state which is used for opening menu for the first time
    const [menuOpen, setMenuOpen] = useState(false); //state which is used to control classes of menu component which is always active after initial opening, so it has animation in closing

    const stopProp = (e) => {
        e.stopPropagation();
    }

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
                <button
                    ref={ref}
                    className={styles.menuButton}
                    onClick={(e) => {
                        setMenuOpen(true);
                        setFirstOpen(true);
                    }}
                >
                    <svg
                        viewBox="0 0 24 24"
                        className={styles.menuLogo}
                        onClick={stopProp}
                    >
                        <use xlinkHref="#menu"></use>
                    </svg>
                </button>

                <Link href='/'>
                    <Image src={'/images/CompanyLogo1.png'} alt="" width="0" height="0" sizes="100vw" className={styles.image} placeholder="blurDataURL" />
                </Link>

                {/* <SearchInput placeholder={'Я ищу ...'} /> */}
                <div className={styles.navButtons}>
                    <div className={styles.navButton}>
                        <svg viewBox="0 0 21 22" fill="none" className={styles.languageButton}>
                            <use xlinkHref='#language-logo'></use>
                        </svg>
                        <p>Русский</p>
                    </div>
                    <Link
                        href="/cart"
                        className={styles.navButton}
                    >
                        <svg viewBox="0 0 21 22" fill="none" className={styles.languageButton}>
                            <use xlinkHref='#bag-logo'></use>
                        </svg>
                        <div className={styles.itemsNumber}>3</div>
                        <div>Корзина</div>
                    </Link>
                    <Link
                        href='/signin'
                        className={styles.navButton}
                    >
                        <svg viewBox="0 0 21 22" fill="none" className={styles.languageButton}>
                            <use xlinkHref='#profile-logo'></use>
                        </svg>
                        <div>Войти</div >
                    </Link>
                </div>
            </nav>
            {
                firstOpen ? <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} refs={ref} /> : null
            }
        </header >
    )
}

export default Header;