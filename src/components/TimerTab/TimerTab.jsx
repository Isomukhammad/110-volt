import { useEffect, useState } from 'react';
import getCountdown from '../../utils/getCoundown';
import styles from './TimerTab.module.scss';

const TimerTab = ({ end }) => {
    const [coundown, setCountdown] = useState();

    const dateStart = new Date(end);
    const timestamp = dateStart.getTime();

    useEffect(() => {
        const timer = setInterval(() => {
            const time = getCountdown(timestamp);
            setCountdown(time);
        }, 1000)

        return () => clearInterval(timer);
    }, [timestamp]);

    return (
        <div className={styles.timerTab}>
            <p className={styles.title}>До завершения осталось: </p>

            <div className={styles.timer}>
                <div>
                    <p className={styles.time}>{coundown?.days}</p>
                    <p>дней</p>
                </div>
                <span>:</span>
                <div>
                    <p className={styles.time}>{coundown?.hours}</p>
                    <p>часов</p>
                </div>
                <span>:</span>
                <div>
                    <p className={styles.time}>{coundown?.minutes}</p>
                    <p>минут</p>
                </div>
                <span>:</span>
                <div>
                    <p className={styles.time}>{coundown?.seconds}</p>
                    <p>секунд</p>
                </div>
            </div>
        </div>
    )
}

export default TimerTab;