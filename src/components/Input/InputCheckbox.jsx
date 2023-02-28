import styles from './InputCheckbox.module.scss';

const FormCheckbox = ({ name, id, checked, ...otherProps }) => {
    return (
        <div className={styles.container}>
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={checked}
                className='focus:ring-0 focus:ring-transparent ring-0 ring-transparent'
                {...otherProps}
            />
            <label htmlFor={name}>{name}</label>
            <div className={styles.tick}>
                <svg
                    viewBox='0 0 16 13'
                    width={16}
                    height={13}
                    stroke="white"
                    fill="none"
                >
                    <use xlinkHref='#tick-logo'></use>
                </svg>
            </div>
        </div>
    )
}

export default FormCheckbox;