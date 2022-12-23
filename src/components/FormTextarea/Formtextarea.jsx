import styles from './Formtextarea.module.scss'

const FormTextarea = ({ register, name, placeholder, required }) => {
    return (
        <textarea
            cols="30"
            rows="10"
            className={styles.input}
            placeholder={placeholder}
            {...register(name, {
                required: `${required}`
            })}
        />
    )
}

export default FormTextarea;