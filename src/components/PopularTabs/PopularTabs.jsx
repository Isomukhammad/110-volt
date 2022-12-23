import data from '../../data.json';
import styles from './PopularTabs.module.scss';

const PopularTabs = () => {
    const { popularItems } = data;
    console.log(popularItems);

    return (
        <div>
            <h2>Популярные товары</h2>
        </div>
    )
}

export default PopularTabs;