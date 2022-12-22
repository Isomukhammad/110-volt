import { useState } from 'react';
import data from '../../data.json';

import MenuCatalogue from '../MenuCatalogue/MenuCatalogue';
import MenuCategory from '../MenuCategory/MenuCategory';
import styles from './Menu.module.scss'

const Menu = () => {
    const [btn, setBtn] = useState(0);
    const { catalogues } = data;

    return (
        <div className={styles.menu}>
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