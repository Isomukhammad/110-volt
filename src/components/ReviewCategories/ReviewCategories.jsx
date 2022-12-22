import Link from 'next/link';
import data from '../../data.json';
import CategoriesTabsLink from '../CategoriesTabsLink/CategoriesTabLink';
import ReviewTab from '../ReviewTab/ReviewTab';

import styles from './ReviewCategories.module.scss';

const ReviewCategories = () => {
    const { reviews } = data;
    return (
        <section className={styles.reviews}>
            <div className={styles.header}>
                <h1>Что думают клиенты о 110-volt?</h1>
                <CategoriesTabsLink linkTitle="Все отзывы" />
            </div>
            <div className={styles.tabs}>
                {
                    reviews.map((review) => (
                        <ReviewTab key={review.id} info={review} />
                    ))
                }
            </div>
        </section>
    )
}

export default ReviewCategories;