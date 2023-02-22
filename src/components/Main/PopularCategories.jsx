import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import PopularCategoryTab from './PopularCategoryTab'

import styles from './PopularCategories.module.scss';
import { useLang } from '../../hooks/useLang';
import Skeleton from 'react-loading-skeleton';
import { useMedia } from '../../context/screenContext';

const PopularCategories = () => {
    const { isDesktop } = useMedia();
    const router = useRouter();
    const lang = useLang();

    const { data: categories, error, isValidating, mutate } = useSWR(['/categories?is_popular=1&quantity=8', router.locale], (url) => fetcher(url, { headers: { 'Accept-Language': router.locale } }),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )

    if (!categories) {
        return (
            <div className='mt-[64px] flex flex-col gap-6 lg:mt-[120px] lg:gap-12'>
                <Skeleton width={300} />
                <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
                    {
                        [...Array(isDesktop ? 8 : 2).keys()].map((item, index) => (
                            <div key={index} className="rounded-[24px] overflow-hidden">
                                <Skeleton height={250} />
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

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