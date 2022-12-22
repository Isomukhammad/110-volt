import Link from "next/link"
import data from "../../data.json"
import CategoriesTabsLink from "../CategoriesTabsLink/CategoriesTabLink"

import ProductItem from "../ProductItem/ProductItem"

import styles from './Recommendations.module.scss'

const Recommendations = ({ title, link, linkTitle }) => {
    return (
        <div className={styles.bestsellers}>
            <div className={styles.titleBar}>
                <h2>{title}</h2>
                {
                    link ? (
                        <CategoriesTabsLink link='/' linkTitle={linkTitle} />
                    ) : (null)
                }
            </div>
            <div className={styles.tabs}>
                {
                    data.bestsellers.map((product) => (
                        <ProductItem key={product.id} info={product} />
                    ))
                }
                {
                    data.bestsellers.slice(0).reverse().map((product) => (
                        <ProductItem key={product.id} info={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default Recommendations;