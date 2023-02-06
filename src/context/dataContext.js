import { useRouter } from "next/router";
import { useContext } from "react";
import { createContext } from "react";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

const DataContext = createContext();

const disableRevalidation = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: 0,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
}

export const DataProvider = ({ children }) => {
    const router = useRouter();

    const {
        data: settings,
        error: settingsError,
        isValidating: settingsVal
    } = useSWR(
        '/settings',
        (url) => fetcher(url),
        disableRevalidation
    )

    const {
        data: tree,
        error: treeError,
        isValidating: treeValidating
    } = useSWR(
        '/categories/tree', (url) => fetcher(url),
        disableRevalidation
    );

    return (
        <DataContext.Provider
            value={{ settings, settingsError, settingsVal, tree, treeError, treeValidating }}
        >
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext);