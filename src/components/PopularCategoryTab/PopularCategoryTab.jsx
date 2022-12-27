import ImageComponent from '../ImageComponent/ImageComponent';

import styles from './PopularCategoryTab.module.scss'

const PopularCategoryTab = ({ info }) => {
    const { name, img } = info;

    return (
        <div className={styles.tab}>
            <ImageComponent src={img} alt="" />
            <p>{name}
                <span>
                    <svg viewBox="0 0 17 16" fill="none" className={styles.arrowIcon} width="16px" height="9.33px">
                        <use xlinkHref='#arrow-right'></use>
                    </svg>
                </span>
            </p>
        </div>
    )
}

export default PopularCategoryTab;