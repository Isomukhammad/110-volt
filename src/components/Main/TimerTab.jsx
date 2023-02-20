import { useEffect, useState } from 'react';
import { useLang } from '../../hooks/useLang';
import { getCountdown } from '../../utils/getCoundown';
import styles from './TimerTab.module.scss';

const TimerTab = ({ end }) => {
    const lang = useLang();
    const [coundown, setCountdown] = useState();

    const timestamp = (new Date(end).getTime());

    useEffect(() => {
        const timer = setInterval(() => {
            const time = getCountdown(timestamp);
            setCountdown(time);
        }, 1000)

        return () => clearInterval(timer);
    }, [timestamp]);

    return (
        <div className={styles.timerTab}>
            <p className={styles.title}>{lang?.['До завершения осталось']}: </p>

            <div className={styles.timer}>
                <div>
                    <p className={styles.time}>{coundown?.days}</p>
                    <p>{lang?.['дней']}</p>
                </div>
                <span>:</span>
                <div>
                    <p className={styles.time}>{coundown?.hours}</p>
                    <p>{lang?.['часов']}</p>
                </div>
                <span>:</span>
                <div>
                    <p className={styles.time}>{coundown?.minutes}</p>
                    <p>{lang?.['минут']}</p>
                </div>
                <span>:</span>
                <div>
                    <p className={styles.time}>{coundown?.seconds}</p>
                    <p>{lang?.['секунд']}</p>
                </div>
            </div>
        </div>
    )
}

export default TimerTab;