import styles from './SearchInput.module.scss'

const SearchInput = ({ placeholder, onChange }) => {
    return (
        <input type="text" placeholder={placeholder} onChange={onChange} className={styles.search} />
    )
}

export default SearchInput;