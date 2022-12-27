import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import HeadInfo from '../../utils/HeadInfo';
import ProductTab from '../../components/ProductTab/ProductTab'

import product from '../../products.json';

import styles from './Category.module.scss'
import ProductsList from "../../components/ProductsList/ProductsList";
import FilterMenu from "../../components/FilterMenu/FilterMenu";

const Category = () => {
    const { query } = useRouter();
    const [data, setData] = useState();

    useEffect(() => {
        const products = product.find((item) => {
            return item.category === query.category;
        })
        setData(products);
        console.log(data?.products);
    }, [query])

    return (
        <>
            <HeadInfo title={`Купить ${data?.title.toLowerCase()} в Ташкенте`} />
            <div className={styles.container}>
                <h1 className={styles.title}>{data?.title}</h1>
                <div className={styles.content}>
                    <FilterMenu />
                    <div>
                        {
                            data ? <ProductsList info={data?.products} /> : null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category;