import useLang from '../../hooks/useLang';

import CategoriesTabsLink from '../CategoriesTabsLink/CategoriesTabLink';
import ReviewTab from '../ReviewTab/ReviewTab';

import styles from './ReviewCategories.module.scss';

const ReviewCategories = () => {
    const lang = useLang();
    return (
        <section className={styles.reviews}>
            <div className={styles.header}>
                <h1 className='font-bold text-[32px]'>{lang?.['Что думают клиенты о 110-volt?']}</h1>
                <CategoriesTabsLink title={lang?.['Все отзывы']} />
            </div>
            <div className={styles.tabs}>
                <ReviewTab key={review.id} info={review} />
                <ReviewTab key={review.id} info={review} />
                <ReviewTab key={review.id} info={review} />
                <ReviewTab key={review.id} info={review} />
                <ReviewTab key={review.id} info={review} />
            </div>
        </section>
    )
}

export default ReviewCategories;