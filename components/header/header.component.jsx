import CompanyLogo from '../../public/icons/logo.svg';
import MenuLogo from '../../public/icons/menu.svg';
import SearchLogo from '../../public/icons/search.svg'
import styles from './header.module.scss';

const Header = () => {
    return (
        <div className={styles.container}>
            <div>
                <MenuLogo />
            </div>
            <CompanyLogo />
            <SearchLogo />
        </div>
    )
}

export default Header;