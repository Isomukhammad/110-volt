import { useEffect, useMemo, useState } from "react";
import HeadInfo from '../../utils/headInfo';
import { nextAxios } from '../../utils/axios';
import { useParams } from '../../hooks/useParams'

import styles from './Categories.module.scss'
import { SortProvider } from "../../context/sortContext";
import Category from '../../components/Category/Category'
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

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

    if (isLoading) {
        return (
            <div className="flex flex-col gap-10 mt-10 mb-[120px]">
                <Skeleton width={300} />
                <div className="flex flex-col gap-2 lg:flex-row lg:gap-5 justify-end lg:justify-start lg:items-end">
                    <Skeleton width={300} height={32} />
                    <Skeleton width={150} height={14} />
                </div>
                <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[16.6%_83.3%]">
                    <div>
                        <div className="lg:hidden"><Skeleton height={50} /></div>
                        <div className="hidden lg:block">
                            {[...Array(10).keys()].map((item) => (
                                <div key={item}><Skeleton /></div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-10">
                        <div className="hidden lg:block"><Skeleton height={50} /></div>
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                            {[...Array(20).keys()].map((item) => (
                                <div key={item} className="overflow-hidden rounded-[24px]"><Skeleton height={350} /></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

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

export const getServerSideProps = async ({ params, locale }) => {
    const category = await nextAxios.get(`categories/${params.category[0].split('-')[0]}`, {
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