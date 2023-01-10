import { useRouter } from "next/router";
import { createContext } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
    const router = useRouter();

    const {
        data: tree,
        error: treeError,
        mutate: mutateTree,
    } = useSWR("https://jsonplaceholder.typicode.com/todos/", fetcher);

    const values = {
        tree,
        treeError
    }

    return (
        <DataContext.Provider value={values}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;