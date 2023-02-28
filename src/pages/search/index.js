import Search from '../../components/Search/Search';

import { SortProvider } from '../../context/sortContext';

const SearchPage = () => {
    return (
        <SortProvider>
            <Search />
        </SortProvider>
    )
}

export default SearchPage;