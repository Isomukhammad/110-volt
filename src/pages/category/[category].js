import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import HeadInfo from '../../utils/HeadInfo';
import ProductTab from '../../components/ProductTab/ProductTab'

import product from '../../products.json';

import styles from './Category.module.scss'
import ProductsList from "../../components/ProductsList/ProductsList";
import FilterMenu from "../../components/FilterMenu/FilterMenu";
import SortMenu from "../../components/SortMenu/SortMenu";

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
                <div className={styles.title}>
                    <h1>{data?.title}</h1>
                    <p>458 товаров</p>
                </div>
                <div className={styles.content}>
                    <FilterMenu />
                    <div className={styles.productsColumn}>
                        <SortMenu />
                        {
                            data ? <ProductsList info={data?.products} /> : null
                        }
                        <div className={styles.pageButtons}>
                            <div className={styles.number}>
                                <button className={styles.prevPage}>
                                    <svg
                                        viewBox="0 0 17 16"
                                        width={17}
                                        height={16}
                                        fill="none"
                                        stroke="#828282"
                                    >
                                        <use xlinkHref="#arrow-right"></use>
                                    </svg>
                                </button>
                                <button className={styles.active}><span>1</span></button>
                                <button><span>2</span></button>
                                <button><span>3</span></button>
                                <button><span>4</span></button>
                                <button><span>5</span></button>
                                <button><span>...</span></button>
                                <button><span>998</span></button>
                                <button><span>999</span></button>
                                <button className={styles.nextPage}>
                                    <svg
                                        viewBox="0 0 17 16"
                                        width={17}
                                        height={16}
                                        fill="none"
                                        stroke="#828282"
                                    >
                                        <use xlinkHref="#arrow-right"></use>
                                    </svg>
                                </button>
                            </div>
                            <div className={styles.showMore}>
                                Показать ещё
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category;