import Image from 'next/image';
import { useEffect } from 'react';
import data from '../../data.json';
import getCountdown from '../../utils/getCoundown';
import TimerTab from '../TimerTab/TimerTab';

import styles from './SalesTabs.module.scss'

const SalesTabs = () => {
    const { sales } = data;

    return (
        <div className={styles.salesTab}>
            <h1>Акции от 110-volt</h1>
            <div className={styles.tabs}>
                {
                    sales.map(item => (
                        <div key={item.id} className={styles.tab}>
                            <Image src={item.img} alt="" width="0" height="0" sizes="100vw" placeholder="blurDataURL" />

                            <TimerTab deadline={item.deadline} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SalesTabs;