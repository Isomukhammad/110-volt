//Custom buttons

import styles from './Button.module.scss'

const Button = ({ children, type, active }) => {
    const reverseType = type === 'reverse' ? styles.reverse : null;
    const newsType = type === 'news' ? styles.news : null;
    let isActive = active;

    if (!isActive) {
        isActive = false;
    }

    return (
        <button
            className={`${styles.button} ${reverseType} ${newsType}`}
            disabled={isActive}
        >
            {children}
        </button>
    )
}


export default Button;