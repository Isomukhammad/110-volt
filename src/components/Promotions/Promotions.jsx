import Image from 'next/image';
import useSWR from 'swr';
import data from '../../data.json';
import fetcher from '../../utils/fetcher';
import TimerTab from '../TimerTab/TimerTab';

import styles from './Promotions.module.scss'

const Promotions = () => {
    const { sales } = data;
    const { data: promotions, error: promotionsError, isValidating } = useSWR('/promotions?type=active&quantity=3', (url) => fetcher(url),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    if (!isValidating) {
        return (
            <div className={styles.salesTab}>
                <h1 className='font-bold text-[32px]'>Акции от 110-volt</h1>
                <div className={styles.tabs}>
                    {
                        promotions.data.map(item => (
                            <div key={item.id} className={styles.tab}>
                                <Image src={item.img} alt={item.name} width="0" height="0" sizes="100vw" placeholder="blurDataURL" />

                                <div className={styles.timer}>
                                    <TimerTab start={item.start_at} end={item.end_at} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Promotions;