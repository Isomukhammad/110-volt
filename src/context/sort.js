import { createContext, useContext, useEffect, useState } from "react";

const SortContext = createContext();

export const SortProvider = ({ children }) => {
    const [sortBy, setSortBy] = useState({ by: '', direction: '' })
    const [isPopular, setIsPopular] = useState(true);
    const [quantity, setQuantity] = useState(25);

    return (
        <SortContext.Provider value={{ quantity, setQuantity, isPopular, setIsPopular, sortBy, setSortBy }}>
            {children}
        </SortContext.Provider>
    )
}

export const useSort = () => useContext(SortContext);