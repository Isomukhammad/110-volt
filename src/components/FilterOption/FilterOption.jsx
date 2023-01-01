import { useState } from 'react';
import styles from './FilterOption.module.scss';

const FilterOption = ({ title, children }) => {
    const [open, setOpen] = useState(true);
    return (
        <div className={`${styles.container} ${open ? styles.rotate : ''}`}>
            <div
                className={styles.title}
                onClick={() => setOpen(!open)}
            >
                <h3>{title}</h3>
                <svg
                    vierBox="0 0 24 24"
                    width={24}
                    height={24}
                    fill="#BDBDBD"
                >
                    <use xlinkHref='#arrow-ios-forward'></use>
                </svg>
            </div>
            <div className={`${styles.options} ${open ? styles.open : styles.close}`}>
                {children}
            </div>
        </div>
    )
}

export default FilterOption;