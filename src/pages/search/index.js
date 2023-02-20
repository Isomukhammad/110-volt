import Search from '../../components/Search/Search';
import { SortProvider } from '../../context/sortContext';
import styles from './search.module.scss';

const SearchPage = () => {
    return (
        <SortProvider>
            <Search />
        </SortProvider>
    )
}

export default SearchPage;