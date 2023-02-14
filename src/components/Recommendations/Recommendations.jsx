import Link from "next/link"
import { useRouter } from "next/router"
import useSWR from "swr"
import fetcher from "../../utils/fetcher"
import CategoriesTabsLink from "../CategoriesTabsLink/CategoriesTabLink"

import CategoryItem from "../CategoryItem/CategoryItem"
import ProductTab from "../ProductsList/ProductsList"

import styles from './Recommendations.module.scss'

const Recommendations = ({ title, link, linkTitle }) => {
    const router = useRouter();
    const { data, error, isValidating, mutate } = useSWR([link, router.locale], (url) => fetcher(url, { headers: { 'Accept-Language': router.locale } }),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )

    if (!isValidating) {
        return (
            <div className={styles.bestsellers}>
                <div className={styles.titleBar}>
                    <h2 className="font-bold text-[24px]">{title}</h2>
                    {/* {
                    link ? (
                        <CategoriesTabsLink link='/' linkTitle={linkTitle} />
                        ) : (null)
                } */}
                </div>
                <div className={styles.tabs}>
                    {
                        data.data.map((product) => (
                            <CategoryItem key={product.id} info={product} />
                        ))
                    }
                </div>
                {/* <div className={styles.mobileTab}>
                <ProductTab info={data.bestsellers} />
            </div> */}
            </div >
        )
    }
}

export default Recommendations;