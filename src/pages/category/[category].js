import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import HeadInfo from '../../utils/HeadInfo';

import product from '../../products.json';

import styles from './Category.module.scss'
import ProductsList from "../../components/ProductsList/ProductsList";
import FilterMenu from "../../components/FilterMenu/FilterMenu";
import SortMenu from "../../components/SortMenu/SortMenu";
import PagePath from "../../components/PagePath/PagePath";
import PageButtons from "../../components/PageButtons/PageButtons";

const Category = () => {
    const { query } = useRouter();
    const [data, setData] = useState();
    const [filterOpen, setFilterOpen] = useState(false)

    useEffect(() => {
        const products = product.find((item) => {
            return item.category === query.category;
        })
        setData(products);
    }, [data?.products, query.category])

    return (
        <>
            <HeadInfo title={`Купить ${data?.title.toLowerCase()} в Ташкенте`} />
            <div className={styles.container}>
                <PagePath category={data?.title} subcategory={data?.title} />
                <div className={styles.title}>
                    <h1>{data?.title}</h1>
                    <p>458 товаров</p>
                </div>
                <div className={styles.content}>
                    <FilterMenu filterOpen={filterOpen} setFilterOpen={setFilterOpen} />
                    <div className={styles.productsColumn}>
                        <SortMenu setFilterOpen={setFilterOpen} />
                        {
                            data ? (
                                <ProductsList
                                    info={data?.products}
                                />
                            ) : null
                        }
                        <PageButtons />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category;