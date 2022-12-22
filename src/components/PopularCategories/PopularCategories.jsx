import data from '../../data.json'
import PopularCategoryTab from '../PopularCategoryTab/PopularCategoryTab'
import styles from './PopularCategories.module.scss';

const PopularCategories = () => {
    return (
        <div className={styles.popularCategories}>
            <h2>Популярные категории</h2>
            <div className={styles.tabs}>
                {
                    data.popularCategories.map((item) => (
                        <PopularCategoryTab key={item.id} info={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default PopularCategories;