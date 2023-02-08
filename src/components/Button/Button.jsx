import styles from './Button.module.scss'

const Button = ({ children, variant, active, ...props }) => {
    const reverseVariant = variant === 'reverse' ? styles.reverse : '';
    const newsVariant = variant === 'news' ? styles.news : '';
    const cartVariant = variant === "cart" ? styles.cart : '';
    let isActive = active;

    if (!isActive) {
        isActive = false;
    }

    return (
        <button
            className={`${styles.button} ${reverseVariant} ${newsVariant} ${cartVariant}`}
            disabled={isActive}
            {...props}
        >
            {children}
        </button>
    )
}


export default Button;