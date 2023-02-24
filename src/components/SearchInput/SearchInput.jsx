import { useRouter } from "next/router";
import { useState } from "react";
import { useSort } from "../../context/sortContext";
import { useParams } from '../../hooks/useParams';

import styles from './SearchInput.module.scss'

const SearchInput = ({ placeholder }) => {
    const router = useRouter();
    // const { view, sortBy, setSortBy } = useSort();
    const [value, setValue] = useState('');
    const { setQuery } = useParams();

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        router.push({
            pathname: '/search',
            query: { value }
        })
        setValue('');
    }

    return (
        <form onSubmit={handleSearch}>
            <input type="text" placeholder={placeholder} onChange={handleChange} value={value} className="block py-4 px-[14px] w-full text-[15px] text-white bg-[#ffffff33] rounded-[16px] border-none appearance-none focus:outline-none focus:ring-0 focus:border-transparent peer placeholder:text-[#ffffff80]" />
        </form>
    )
}

export default SearchInput;