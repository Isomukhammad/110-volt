import styles from './FormInput.module.scss'

const FormInput = ({ name, register, placeholder, required }) => {
    if (!name || !register || !placeholder || !required) {
        return null;
    }

    return (
        <input
            {...register(name, {
                required: `${required}`,
            })}
            placeholder={placeholder}
            className={styles.input}
        />
    )
}

export default FormInput;
