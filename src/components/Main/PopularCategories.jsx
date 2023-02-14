import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import PopularCategoryTab from './PopularCategoryTab'

import styles from './PopularCategories.module.scss';
import { useLang } from '../../hooks/useLang';

const PopularCategories = () => {
    const router = useRouter();
    const lang = useLang();
    const { data: categories, error, isValidating, mutate } = useSWR(['/categories', router.locale], (url) => fetcher(url, { headers: { 'Accept-Language': router.locale } }),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )

    return (
        <div className={styles.popularCategories}>
            <h2 className='font-bold text-[24px] lg:text-[32px]'>{lang?.['Популярные категории']}</h2>
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