import { useState } from 'react';
import styles from './FormCheckbox.module.scss';

const FormCheckbox = ({ name, handleChange }) => {
    const [checked, setChecked] = useState(false);

    return (
        <div className={styles.container}>
            <input
                type="checkbox"
                id={name}
                name={name}
                onChange={(event) => {
                    handleChange(event);
                    setChecked(!checked);
                }}
                className='focus:ring-0 focus:ring-transparent ring-0 ring-transparent'
            />
            <label htmlFor={name}>{name}</label>
            {checked ? (
                <div className={styles.tick}>
                    <svg
                        viewBox='0 0 16 13'
                        width={16}
                        height={13}
                        stroke="white"
                        fill="none"
                    >
                        <use xlinkHref='#tick-logo'></use>
                    </svg>
                </div>
            ) : null}
        </div>
    )
}

export default FormCheckbox;