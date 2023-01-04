import styles from './InputRadio.module.scss';

const InputRadio = ({ name, color, value }) => {
    const red = color === "red" ? styles.red : '';
    const black = color === "black" ? styles.black : '';
    const white = color === "white" ? styles.white : '';
    const purple = color === "purple" ? styles.purple : '';
    const orange = color === "orange" ? styles.orange : '';
    const blue = color === "blue" ? styles.blue : '';

    return (
        <div className={`${styles.container} ${red} ${black} ${white} ${purple} ${orange} ${blue}`}>
            <input
                type="radio"
                name={name}
                value={value}
                className={styles.radio}
            />
        </div>
    )
}

export default InputRadio;