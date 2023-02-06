import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import HeadInfo from '../../utils/HeadInfo';
import { nextAxios } from '../../utils/axios';
import { useParams } from '../../hooks/useParams'
import ProductsList from "../../components/ProductsList/ProductsList";
import FilterMenu from "../../components/Category/FilterMenu";
import SortMenu from "../../components/Category/SortMenu";
import PagePath from "../../components/PagePath/PagePath";

import styles from './Categories.module.scss'
import { SortProvider } from "../../context/sort";
import Category from '../../components/Category/Category'

const CategoryPage = ({ category }) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { getParams } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await nextAxios
                    .get(`/categories/${category.data.id}/prices`)
                    .then(res => setData(prevData => ({ ...prevData, prices: res.data })))

                await nextAxios
                    .get(`/categories/${category.data.id}/brands`)
                    .then(res => setData(prevData => ({ ...prevData, brands: res.data.data })))

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

    // const baseUrl = 'https://topmall.uz/categories/'
    // const url = useMemo(() => {
    //     return baseUrl + getParams(['page']).join('/')
    // }, [getParams])
    // console.log(getParams(['page']));

    if (!isLoading) {

        return (
            <>
                <HeadInfo
                    title={category.seo_title}
                    description={category.meta_description}
                    keywords={category.meta_keywords}
                />
                <div className={styles.container}>

                    {/* <div className={styles.title}>
                        <h1></h1>
                        <p>458 товаров</p>
                    </div>
                    <div className={styles.content}>
                        <FilterMenu filterOpen={filterOpen} setFilterOpen={setFilterOpen} />
                        <div className={styles.productsColumn}>
                            <SortMenu setFilterOpen={setFilterOpen} />
                            <SortProvider>
                                <Category
                                    attributes={data.attributes}
                                    prices={data.prices}
                                    brands={data.brands}
                                    category={category.data}
                                    dataLoading={isLoading}
                                />
                            </SortProvider>
                        </div>
                    </div> */}
                    <div className="">
                        <SortProvider>
                            <Category
                                attributes={data.attributes}
                                prices={data.prices}
                                brands={data.brands}
                                category={category.data}
                                dataLoading={isLoading}
                            />
                        </SortProvider>
                    </div>
                </div>
            </>
        )
    }
}

export const getServerSideProps = async ({ params }) => {
    const category = await nextAxios.get(`/categories/${params.category[0].split('-')[0]}`)
        .then((res) => res.data)
        .catch((err) => console.error(err))

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

export default CategoryPage;