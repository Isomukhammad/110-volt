import styles from './Button.module.scss'

const Button = ({ children, ...otherProps }) => (
    <button {...otherProps} className={styles.button}>{children}</button>
)

export default Button;