import styles from './FormInput.module.scss'

const FormInput = ({ name, register, placeholder, required, type, maxLength, minLength, error }) => {
    if (!name || !register || !placeholder || !required) {
        return null;
    }

    return (
        <input
            type={type}
            {...register(name, {
                required: `${required}`,
                minLength: {
                    value: `${minLength}`,
                    message: `Надо минимум ${minLength} символов`
                },
                maxLength: {
                    value: `${maxLength}`,
                    message: `Надо максимум ${maxLength} символов`
                }
            })}
            placeholder={placeholder}
            className={`${styles.input} ${error ? styles.error : null}`}
        />
    )
}

export default FormInput;
