import { useEffect, useRef, useState } from 'react';
import data from '../../data.json';

import MenuCatalogue from '../MenuCatalogue/MenuCatalogue';
import MenuCategory from '../MenuCategory/MenuCategory';
import styles from './Menu.module.scss'


const Menu = ({ menuOpen, setMenuOpen, refs }) => {
    console.log(refs);
    const useOutsideAlerter = (ref) => {
        console.log(ref);
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            const handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target) && !event.target.contains(refs.current)) {
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
        <div className={styles.menu} ref={wrapperRef}>
            <div className={styles.menuCatalogue}>
                <MenuCatalogue catalogues={catalogues} btn={btn} setBtn={setBtn} />
            </div>
            <div className={styles.catalogueItems}>
                <MenuCategory catalogues={catalogues} btn={btn} />
            </div>
        </div>
    )
}

export default Menu;