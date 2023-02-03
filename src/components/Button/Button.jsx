import styles from './Button.module.scss'

const Button = ({ children, type, active }) => {
    const reverseType = type === 'reverse' ? styles.reverse : '';
    const newsType = type === 'news' ? styles.news : '';
    const cartType = type === "cart" ? styles.cart : '';
    let isActive = active;

    if (!isActive) {
        isActive = false;
    }

    return (
        <button
            className={`${styles.button} ${reverseType} ${newsType} ${cartType}`}
            disabled={isActive}
        >
            {children}
        </button>
    )
}


export default Button;