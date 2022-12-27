import styles from './FilterRadio.module.scss';

const RadioButton = ({ name, color }) => (
    <div className={styles.container}>
        <input
            type="radio"
            name={name}
            style={{ backgroundColor: { color } }}
            className={styles.radio}
        />
    </div>
)

export default RadioButton;