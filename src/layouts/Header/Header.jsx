import { useRef, useState } from 'react';
import Link from 'next/link';
import { useLang } from '../../hooks/useLang';

import { useMedia } from '../../context/screenContext';
import { useData } from '../../context/dataContext';
import { useCart } from '../../context/cartContext';
import { useAuth } from '../../context/authContext';

import Menu from '../Menu/Menu';
import SearchInput from '../../components/SearchInput/SearchInput';

import styles from './Header.module.scss';
import { useRouter } from 'next/router';
import { useWish } from '../../context/wishContext';

const Header = () => {
    const router = useRouter();
    const lang = useLang();
    const { user, userLoading } = useAuth();
    const { settings, settingsError, tree, treeValidating, cartLoading } = useData();
    const { isDesktop } = useMedia();
    const [searchFocus, setSearchFocus] = useState(false);
    const ref = useRef(false)
    const [firstOpen, setFirstOpen] = useState(false); //state which is used for opening menu for the first time
    const [menuOpen, setMenuOpen] = useState(false); //state which is used to control classes of menu component which is always active after initial opening, so it has animation in closing
    const { cart, localCart } = useCart();
    const { wish, localWish } = useWish();

    const wishStore = wish || localWish;
    const cartStore = cart || localCart;

    const stopProp = (e) => {
        e.stopPropagation();

    }

    return (
        <header className={styles.container}>
            <div className={styles.information}>
                <div className={styles.contacts}>
                    <div className={styles.social}>
                        <Link href={settings ? settings?.instagram : '#'}>
                            <svg viewBox="0 0 16 16" width={16} height={16} fill="white">
                                <use xlinkHref='#instagram-logo' />
                            </svg>
                        </Link>
                        <Link href={settings ? settings.telegram : '#'}>
                            <svg viewBox="0 0 16 16" width={16} height={15} fill="white">
                                <use xlinkHref='#telegram-logo'></use>
                            </svg>
                        </Link>
                    </div>
                    <p><Link href={settings ? `tel:${settings.phone}` : '#'}>{settings?.phone}</Link></p>
                </div>

                <div className={styles.categories}>
                    {
                        tree ? (
                            tree.data.map((category) => (
                                <Link
                                    href={`/categories/${category.id}-${category.slug}`}
                                    key={category.id}
                                    className='hover:text-black'
                                >{category.name}</Link>
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
                        !isDesktop ? (
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
                    <div
                        // href={router.asPath}
                        // locale={router.locale === 'uz' ? 'ru' : 'uz'}
                        className={styles.navButton}
                    >
                        <svg viewBox="0 0 21 22" fill="none" className={styles.languageButton}>
                            <use xlinkHref='#language-logo'></use>
                        </svg>
                        {
                            (() => {
                                if (router.locale === 'ru') {
                                    return (
                                        <p>Русский</p>
                                    )
                                } else if (router.locale === 'uz') {
                                    return (
                                        <p>O&apos;zbekcha</p>
                                    )
                                }
                            })()
                        }
                    </div>
                    <Link
                        href="/wishes"
                        className={styles.navButton}
                    >
                        <svg viewBox="0 0 21 22" fill="white" stroke="white" className={styles.languageButton}>
                            <use xlinkHref='#heart'></use>
                        </svg>
                        {
                            !cartLoading && wishStore ? (
                                wishStore.quantity !== 0 ? (
                                    <div className={styles.itemsNumberWish}>{wishStore.quantity}</div>) : (null)
                            ) : null
                        }
                        <div>{lang?.['Избранное']}</div>
                    </Link>
                    <Link
                        href="/cart"
                        className={styles.navButton}
                    >
                        <svg viewBox="0 0 21 22" fill="none" stroke="white" className={styles.languageButton}>
                            <use xlinkHref='#bag-logo-white'></use>
                        </svg>
                        {
                            !cartLoading && cartStore ? (
                                cartStore.quantity !== 0 ? (
                                    <div className={styles.itemsNumber}>{cartStore.quantity}</div>) : (null)
                            ) : null
                        }
                        <div>{lang?.['Корзина']}</div>
                    </Link>
                    {!userLoading ? (
                        <Link
                            href={user ? '/profile' : '/signin'}
                            className={styles.navButton}
                        >
                            <svg viewBox="0 0 21 22" width={21} height={22} fill="none" className={styles.languageButton}>
                                <use xlinkHref='#profile-logo'></use>
                            </svg>
                            <div>{user ? lang?.['Профиль'] : lang?.['Войти']}</div >
                        </Link>
                    ) : (null)}
                </div>
            </nav>
            {
                firstOpen ? <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} refs={ref} searchFocus={searchFocus} setSearchFocus={setSearchFocus} /> : null
            }
        </header >
    )
}

export default Header;