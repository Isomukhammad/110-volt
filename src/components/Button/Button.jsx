//Custom buttons

import styles from './Button.module.scss'

const Button = ({ children, type }) => {
    const reverseType = type === 'reverse' ? styles.reverse : null;
    const newsType = type === 'news' ? styles.news : null;

    return (
        <button className={`${styles.button} ${reverseType} ${newsType}`}>{children}</button>
    )
}


export default Button;