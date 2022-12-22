import Link from "next/link"
import data from "../../data.json"

import ProductItem from "../ProductItem/ProductItem"

import styles from './Recommendations.module.scss'

const Recommendations = ({ title, link, linkTitle }) => {
    return (
        <div className={styles.bestsellers}>
            <div className={styles.titleBar}>
                <h2>{title}</h2>
                {
                    link ? (
                        <Link href={`${link}`}>{linkTitle}<span>
                            <svg viewBox="0 0 17 16" fill="none" className={styles.arrowIcon} width="16px" height="9.33px">
                                <use xlinkHref='#arrow-right'></use>
                            </svg>
                        </span></Link>
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
                    data.bestsellers.map((product) => (
                        <ProductItem key={product.id} info={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default Recommendations;