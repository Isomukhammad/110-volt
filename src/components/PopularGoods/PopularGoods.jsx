import data from '../../data.json';
import CategoriesTabsLink from '../CategoriesTabsLink/CategoriesTabLink';
import ProductTab from '../ProductTab/ProductTab';

import styles from './PopularGoods.module.scss';

const PopularGoods = () => {
    const { popularItems } = data;

    return (
        <div className={styles.container}>
            <div className={styles.titleBar}>
                <h2>Популярные товары</h2>
                <CategoriesTabsLink linkTitle="Все товары" link="/" />
            </div>
            <div className={styles.tabs}>
                {
                    popularItems.map((item) => (
                        <ProductTab key={item.id} info={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default PopularGoods;