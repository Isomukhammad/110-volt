import Link from "next/link"
import { useRouter } from "next/router"
import Skeleton from "react-loading-skeleton"
import useSWR from "swr"
import { useMedia } from "../../context/screenContext"
import { useLang } from "../../hooks/useLang"
import fetcher from "../../utils/fetcher"
import CategoriesTabsLink from "../CategoriesTabsLink/CategoriesTabLink"

import CategoryItem from "../CategoryItem/CategoryItem"
import ProductTab from "../ProductsList/ProductsList"

import styles from './Recommendations.module.scss'

const Recommendations = ({ title, link, linkTitle }) => {
    const { isDesktop } = useMedia();
    const router = useRouter();
    const lang = useLang();
    const { data, error, isValidating, mutate } = useSWR([link, router.locale], (url) => fetcher(url, { headers: { 'Accept-Language': router.locale } }),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )

    return (
        <div className={styles.bestsellers}>
            <div className={styles.titleBar}>
                <h2 className="font-bold text-[24px]">{lang ? lang?.[`${title}`] : <Skeleton width={300} />}</h2>
            </div>
            {
                data ? (
                    <div className={styles.tabs}>
                        {
                            data?.data.map((product) => (
                                <CategoryItem key={product.id} info={product} />
                            ))
                        }
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-6 justify-between gap-4">
                        {
                            [...Array(isDesktop ? 6 : 2).keys()].map((item, index) => (
                                <Skeleton height={400} key={index} />
                            ))
                        }
                    </div>
                )
            }
            {/* <div className={styles.mobileTab}>
                <ProductTab info={data.bestsellers} />
            </div> */}
        </div >
    )
}

export default Recommendations;