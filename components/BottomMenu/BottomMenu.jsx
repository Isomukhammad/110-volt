import HomeLogo from '../../public/icons/Home.svg'
import MenuLogo from '../../public/icons/gg_menu.svg';
import BagLogo from '../../public/icons/Bag.svg';
import ProfileLogo from '../../public/icons/Profile.svg';

import styles from './BottomMenu.module.scss'
import Link from 'next/link';

const BottomMenu = () => {
    return (
        <menu className={styles.container}>
            <Link href="/">
                <HomeLogo />
                <p className={styles.home}>Главная</p>
            </Link>
            <Link href="/">
                <MenuLogo />
                <p>Каталог</p>
            </Link>
            <Link href="/">
                <BagLogo />
                <p>Корзина</p>
            </Link>
            <Link href="/">
                <ProfileLogo />
                <p>Профиль</p>
            </Link>
        </menu>
    )
}

export default BottomMenu;