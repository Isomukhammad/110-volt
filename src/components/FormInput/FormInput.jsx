import styles from './FormInput.module.scss'

const FormInput = ({ register, ...otherProps }) => {
    console.log({ register })

    return (
        <input {...otherProps} className={styles.input} {...register("name")} />
    )
}

export default FormInput;
