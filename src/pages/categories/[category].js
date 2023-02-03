import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import HeadInfo from '../../utils/HeadInfo';
import { nextAxios } from '../../utils/axios';

import product from '../../products.json';

import styles from './Categories.module.scss'
import ProductsList from "../../components/ProductsList/ProductsList";
import FilterMenu from "../../components/FilterMenu/FilterMenu";
import SortMenu from "../../components/SortMenu/SortMenu";
import PagePath from "../../components/PagePath/PagePath";
import PageButtons from "../../components/PageButtons/PageButtons";

const Category = ({ category }) => {
    console.log(category)
    const { query } = useRouter();
    const [data, setData] = useState();
    const [filterOpen, setFilterOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //fetching prices
                await nextAxios
                    .get(`/categories/${category.data.id}/prices`)
                    .then(res => setData(prevData => ({ ...prevData, prices: res.data })))

                //fetching brands
                await nextAxios
                    .get(`/categories/${category.data.id}/brands`)
                    .then(res => setData(prevData => ({ ...prevData, brands: res.data.data })))

                //fetching attributes
                await nextAxios
                    .get(`/categories/${category.data.id}/attributes`)
                    .then(res => setData(prevData => ({ ...prevData, attributes: res.data.data })))
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();
    }, [category.data.id])

    useEffect(() => {
        console.log(category);
    }, [category]);

    return (
        <>
            <HeadInfo title={`Купить as в Ташкенте`} />
            <div className={styles.container}>
                <PagePath
                    paths={[
                        {
                            "url": "/",
                            "name": "Главная"
                        }, {
                            "url": "/",
                            "name": `Компьютерная техника`
                        }, {

                            "url": "",
                            "name": `Ноутбуки`

                        }
                    ]}
                />
                <div className={styles.title}>
                    <h1>Title</h1>
                    <p>458 товаров</p>
                </div>
                <div className={styles.content}>
                    <FilterMenu filterOpen={filterOpen} setFilterOpen={setFilterOpen} />
                    <div className={styles.productsColumn}>
                        <SortMenu setFilterOpen={setFilterOpen} />
                        {/* {
                            data ? (
                                <ProductsList
                                    info={data?.products}
                                />
                            ) : null
                        } */}
                        {/* <PageButtons /> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async ({ params }) => {
    // const category = await nextAxios
    // 	.get(`/categories/${params.category[0].split('-')[0]}`, {
    // 		headers: { 'Accept-Language': locale },
    // 	})
    // 	.then((res) => res.data.data)
    // 	.catch((err) => console.error(err))
    const category = await nextAxios.get(`/categories/${params.category[0].split('-')[0]}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))

    if (!category) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            category,
        },
    }
}

export default Category;