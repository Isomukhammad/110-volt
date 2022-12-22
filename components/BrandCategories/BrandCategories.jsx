import data from '../../data.json';
import BrandTab from '../BrandTab/BrandTap';

import styles from './BrandCategories.module.scss';

const BrandCategories = () => {
    const { brands } = data;

    return (
        <div className={styles.brands}>
            <h1>Популярные бренды</h1>
            <div className={styles.tabs}>
                {
                    brands.map((brand) => (
                        <BrandTab key={brand.id} info={brand} />
                    ))
                }
                {
                    brands.map((brand) => (
                        <BrandTab key={brand.id} info={brand} />
                    ))
                }
            </div>
        </div>
    )
}

export default BrandCategories;