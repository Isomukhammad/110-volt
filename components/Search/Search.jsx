import styles from './Search.module.scss'

const Search = ({ placeholder, onChange }) => {
    return (
        <input type="text" placeholder={placeholder} onChange={onChange} className={styles.search} />
    )
}

export default Search;