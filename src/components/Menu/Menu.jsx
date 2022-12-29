//scss is in styles folder

import { useEffect, useRef, useState } from 'react';
import data from '../../data.json';

import MenuCatalogue from '../MenuCatalogue/MenuCatalogue';
import MenuCategory from '../MenuCategory/MenuCategory';

import styles from './Menu.module.scss';

const Menu = ({ menuOpen, setMenuOpen }) => {
    const useOutsideAlerter = (ref) => {
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    setMenuOpen(false);
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const [btn, setBtn] = useState(0);
    const { catalogues } = data;

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <div
            className={`${styles.container} ${menuOpen ? styles.menuIsOpen : styles.menuIsClosed}`}
        >
            <div className={styles.menu} ref={wrapperRef}>
                <div className={styles.menuCatalogue}>
                    <MenuCatalogue catalogues={catalogues} btn={btn} setBtn={setBtn} />
                </div>
                <div className={styles.catalogueItems}>
                    <MenuCategory catalogues={catalogues} btn={btn} setMenuOpen={setMenuOpen} />
                </div>
                <div
                    className={styles.close}
                    onClick={() => setMenuOpen(false)}
                >
                    <svg
                        viewBox='0 0 32 32'
                        width={32}
                        height={32}
                        stroke="white"
                        fill="white"
                    >
                        <use xlinkHref='#close'></use>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Menu;