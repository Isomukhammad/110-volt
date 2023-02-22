import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useLang } from '../../hooks/useLang';

import fetcher from '../../utils/fetcher';

import TimerTab from './TimerTab';

import styles from './Promotions.module.scss'
import Skeleton from 'react-loading-skeleton';

const Promotions = () => {
    const router = useRouter;
    const lang = useLang();
    const { data: promotions, error: promotionsError, isValidating } = useSWR(['/promotions?quantity=3&type=active', router.locale], (url) => fetcher(url, { header: { 'Accept-Language': router.locale } }),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

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
            <h1 className='font-bold text-[32px]'>{lang?.['Акции от 110-volt']}</h1>
            <div className={styles.tabs}>
                {
                    promotions.data.length !== 0 ? (
                        promotions.data.map(item => (
                            <div key={item.id} className={styles.tab}>
                                <Image src={item.img} alt={item.name || ''} width="0" height="0" sizes="100vw" placeholder="blurDataURL" />

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