import styles from './Formtextarea.module.scss'

const FormTextarea = ({ ...otherProps }) => {
    return (
        <textarea cols="30" rows="10" {...otherProps} className={styles.input}></textarea>
    )
}

export default FormTextarea;