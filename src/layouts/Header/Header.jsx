import { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';


import { ScreenContext } from '../../context/screenContext';

import Menu from '../Menu/Menu';
import SearchInput from '../../components/SearchInput/SearchInput';

import styles from './Header.module.scss';
import { useData } from '../../context/dataContext';

const Header = () => {
    const { settings, settingsError, tree, treeValidating } = useData();
    const { isMobile, isTablet } = useContext(ScreenContext)
    const [searchFocus, setSearchFocus] = useState(false);
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
                        <Link href={settings ? settings?.instagram : '#'}>
                            <svg width={16} height={16} fill="white">
                                <use xlinkHref='#instagram-logo' />
                            </svg>
                        </Link>
                        <Link href={settings ? settings.telegram : '#'}>
                            <svg viewBox="0 0 24 24" width={16} height={15} fill="white">
                                <use xlinkHref='#telegram-logo'></use>
                            </svg>
                        </Link>
                    </div>
                    <p><Link href={settings ? `tel:${settings.phone}` : '#'}>{settings?.phone}</Link></p>
                </div>

                <div className={styles.categories}>
                    {
                        !treeValidating ? (
                            tree.data.map((category) => (
                                <Link href={`/categories/${category.id}-${category.slug}`} key={category.id}>{category.name}</Link>
                            ))
                        ) : (null)
                    }
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
                    {
                        isTablet || isMobile ? (
                            <div className={styles.mobileLogo} dangerouslySetInnerHTML={{ __html: settings?.logo_light_svg }} />
                        ) : (
                            <div dangerouslySetInnerHTML={{ __html: settings?.logo_svg }} />
                        )
                    }
                </Link>

                <div className={styles.search}>
                    <SearchInput placeholder={'Я ищу ...'} />
                </div>

                <div
                    className={styles.searchLogo}
                    onClick={() => {
                        setFirstOpen(true);
                        setMenuOpen(true);
                        setSearchFocus(true);
                    }}
                >
                    <svg
                        viewBox='0 0 24 24'
                        width={24}
                        height={24}
                        stroke="white"
                        fill='none'
                    >
                        <use xlinkHref='#search'></use>
                    </svg>
                </div>

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
                        <svg viewBox="0 0 21 22" width={21} height={22} fill="none" className={styles.languageButton}>
                            <use xlinkHref='#profile-logo'></use>
                        </svg>
                        <div>Войти</div >
                    </Link>
                </div>
            </nav>
            {
                firstOpen ? <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} refs={ref} searchFocus={searchFocus} setSearchFocus={setSearchFocus} /> : null
            }
        </header >
    )
}

export default Header;