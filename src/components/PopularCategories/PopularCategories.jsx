import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import PopularCategoryTab from '../PopularCategoryTab/PopularCategoryTab'

import styles from './PopularCategories.module.scss';

const PopularCategories = () => {
    const { data: categories, error, isValidating, mutate } = useSWR('/categories', (url) => fetcher(url),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )

    return (
        <div className={styles.popularCategories}>
            <h2 className='font-bold text-[24px] lg:text-[32px]'>Популярные категории</h2>
            <div className={styles.tabs}>
                {!isValidating ? (
                    categories.data.map((item) => (
                        <PopularCategoryTab key={item.id} data={item} />
                    ))
                ) : (null)
                }
            </div>
        </div>
    )
}

export default PopularCategories;