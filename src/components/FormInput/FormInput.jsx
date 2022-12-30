import styles from './FormInput.module.scss'

const FormInput = ({ name, register, placeholder, required, type, maxLength, minLength, error, value }) => {
    if (!name || !register || !placeholder || !required) {
        return null;
    }

    return (
        <input
            type={type}
            {...register(name, {
                required: `${required ? required : false}`,
                minLength: {
                    value: `${minLength ? minLength : null}`,
                    message: `Надо минимум ${minLength} символов`
                },
                maxLength: {
                    value: `${maxLength ? maxLength : null}`,
                    message: `Надо максимум ${maxLength} символов`
                }
            })}
            placeholder={placeholder}
            className={`${styles.input} ${error ? styles.error : null}`}
            value={value ? value : null}
        />
    )
}

export default FormInput;
