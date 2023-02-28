import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useLang } from '../../hooks/useLang';

import fetcher from '../../utils/fetcher';

import TimerTab from './TimerTab';

import styles from './Promotions.module.scss'
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import CategoriesTabsLink from '../CategoriesTabsLink/CategoriesTabLink';

const Promotions = () => {
    const router = useRouter();
    const lang = useLang();
    const { data: promotions, error: promotionsError, isValidating } = useSWR(['/promotions?type=active&page=1&quantity=3', router.locale], (url) => fetcher(url, { headers: { 'Accept-Language': router.locale } }),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    console.log(promotions);

    if (!promotions || isValidating) {
        return (
            <div className='hidden mt-[64px] flex-col gap-6 lg:block lg:mt-[120px] lg:gap-12'>
                <Skeleton width={300} />
                <div className='lg:grid lg:grid-cols-3 gap-4'>
                    <div className="rounded-[24px] overflow-hidden"><Skeleton height={450} /></div>
                    <div className="rounded-[24px] overflow-hidden"><Skeleton height={450} /></div>
                    <div className="rounded-[24px] overflow-hidden"><Skeleton height={450} /></div>
                </div>
            </div>
        )
    }


    return (
        <div className={styles.salesTab}>
            <div className='flex flex-row justify-between items-center'>
                <h1 className='font-bold text-[32px]'>{lang?.['Акции от 110-volt']}</h1>
                <CategoriesTabsLink title={lang?.['Все акции']} url="/sales" />
            </div>
            <div className={styles.tabs}>
                {
                    promotions.data.length !== 0 ? (
                        promotions.data.map(item => (
                            <div key={item.id} className={styles.tab}>
                                <Link href={`sales/${item.id}-${item.slug}`}>
                                    <Image src={item.img} alt={item.name || ''} width="0" height="0" sizes="100vw" placeholder="blurDataURL" />
                                </Link>

                                <div className={styles.timer}>
                                    <TimerTab start={item.start_at} end={item.end_at} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>{lang?.['Здесь пока ничего нет']}</div>
                    )
                }
            </div>
        </div>
    )
}

export default Promotions;