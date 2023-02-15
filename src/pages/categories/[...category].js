import { useEffect, useMemo, useState } from "react";
import HeadInfo from '../../utils/HeadInfo';
import { nextAxios } from '../../utils/axios';
import { useParams } from '../../hooks/useParams'

import styles from './Categories.module.scss'
import { SortProvider } from "../../context/sort";
import Category from '../../components/Category/Category'
import { useRouter } from "next/router";

const CategoryPage = ({ category }) => {
    const router = useRouter();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { getParams } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await nextAxios
                    .get(`/categories/${category.data.id}/prices`, {
                        headers: { 'Accept-Language': router.locale }
                    })
                    .then(res => setData(prevData => ({ ...prevData, prices: res.data })))

                await nextAxios
                    .get(`/categories/${category.data.id}/brands`, {
                        headers: { 'Accept-Language': router.locale }
                    })
                    .then(res => setData(prevData => ({ ...prevData, brands: res.data.data })))

                await nextAxios
                    .get(`/categories/${category.data.id}/attributes`, {
                        headers: { 'Accept-Language': router.locale }
                    })
                    .then(res => setData(prevData => ({ ...prevData, attributes: res.data.data })))
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();
    }, [category.data.id])

    const baseUrl = 'https://shop.inweb.uz/api/v2/categories/'
    const url = useMemo(() => {
        return baseUrl + getParams(['page']).join('/')
    }, [getParams])
    console.log(getParams(['page']));

    if (!isLoading) {

        return (
            <>
                <HeadInfo
                    title={category.seo_title}
                    description={category.meta_description}
                    keywords={category.meta_keywords}
                />
                <div className={styles.container}>
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

export const getServerSideProps = async ({ params, locale }) => {
    const category = await nextAxios.get(`/categories/${params.category[0].split('-')[0]}`, {
        headers: { 'Accept-Language': locale }
    })
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