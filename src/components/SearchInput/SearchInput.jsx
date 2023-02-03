import styles from './SearchInput.module.scss'

const SearchInput = ({ placeholder, onChange }) => {
    return (
        <input type="text" placeholder={placeholder} onChange={onChange} className="block py-4 px-[14px] w-full text-[15px] text-white bg-[#ffffff33] rounded-[16px] border-none appearance-none focus:outline-none focus:ring-0 focus:border-transparent peer placeholder:text-[#ffffff80]" />
    )
}

export default SearchInput;