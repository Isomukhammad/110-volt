import Link from 'next/link';
import ImageComponent from '../ImageComponent/ImageComponent';

import styles from './PopularCategoryTab.module.scss'

const PopularCategoryTab = ({ data }) => {
    const { name, img, id, slug } = data;

    return (
        <Link href={`/categories/${id}-${slug}`} className={styles.container}>
            <ImageComponent src={img} alt="" />
            <div className={styles.title}>
                <p>{name}</p>
                <svg viewBox="0 0 16 16" fill="none" className={styles.arrowIcon} width="16px" height="16" stroke="#242424">
                    <use xlinkHref='#arrow-right'></use>
                </svg>
            </div>
        </Link>
    )
}

export default PopularCategoryTab;