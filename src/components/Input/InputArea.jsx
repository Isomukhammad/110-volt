import styles from './InputArea.module.scss'

const InputArea = ({ register, name, placeholder, required }) => {
    return (
        <textarea
            cols="30"
            rows="8"
            className={styles.input}
            placeholder={placeholder}
            {...register(name, {
                required: `${required}`
            })}
        />
    )
}

export default InputArea;