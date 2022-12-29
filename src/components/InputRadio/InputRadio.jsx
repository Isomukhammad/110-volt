import styles from './InputRadio.module.scss';

const InputRadio = ({ name, color, value }) => (
    <div className={styles.container}>
        <input
            type="radio"
            name={name}
            value={value}
            style={{ backgroundColor: { color } }}
            className={styles.radio}
        />
    </div>
)

export default InputRadio;