import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext, useEffect, useMemo, useState } from 'react';
import ProductTab from '../ProductTab/ProductTab';
import PageButtons from "../../components/PageButtons/PageButtons";
import { useParams } from '../../hooks/useParams';
import { ScreenContext } from '../../context/screenContext';
import { useSort } from '../../context/sort';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import PagePath from '../PagePath/PagePath';
import styles from './Category.module.scss';
import FilterMenu from './FilterMenu';
import SortMenu from './SortMenu';
import HeadInfo from '../../utils/HeadInfo';

const Category = ({
    attributes,
    prices,
    brands,
    category,
    dataLoading
}) => {
    const [filterOpen, setFilterOpen] = useState(false)
    const router = useRouter();
    const [productId, setProductId] = useState(null);
    const { quantity, view, sortBy, isPopular, setIsPopular } = useSort();
    const { findParams, updateParams } = useParams()
    // const arrLength = info.length - 1;
    const { isMobile, isTablet } = useContext(ScreenContext)

    const url = useMemo(() => {
        const brandParams = findParams('brand')
            ? findParams('brands')
                .split('=')[1]
                .split(',')
                .map((brand) => `&brands[]=${brand.split('-')[0]}`)
                .join('')
            : ''

        const attributeParams = router.query.category
            .map((query) => {
                if (query.split('=')[0].includes('attribute')) {
                    const keys = query.split('=')[0].split('-')
                    const values = query.split('=')[1].split(',')
                    return values
                        .map(
                            (value) =>
                                `&attributes[${keys[keys.length - 1]}][]=${value.split('-')[0]}`
                        )
                        .join('')
                } else {
                    return ''
                }
            })
            .join('')

        const priceParams = findParams('price')
            ? findParams('price')
                .split('=')[1]
                .split('-')
                .map((price, i) => `&price_${i == 0 ? 'from' : 'to'}=${price}`)
            : ''

        return `/products?category_id=${category.id
            }${brandParams}${attributeParams}${priceParams}${isPopular ? 'is_new' : ''}&order_by=${sortBy.by
            }&order_direction=${sortBy.direction}&page=${router.query.page || 1
            }&quantity=${router.query.quantity || 20}`
    }, [
        isPopular,
        category.id,
        sortBy,
        router.query.category,
        router.query.page,
        router.query.quantity,
        findParams
    ])

    const { data: products, isValidating } = useSWR(url, (url) => fetcher(url), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    return (
        <>
            <HeadInfo
                title={category?.seo_title}
                description={category?.meta_description}
                keywords={category?.meta_keywords}
            />
            <div className={styles.container}>
                <PagePath
                    paths={[
                        {
                            "url": "/",
                            "name": "Главная"
                        }, {
                            "name": category?.name,
                            "url": ""
                        }
                    ]}
                />
                <div className={styles}>
                    <div className={styles.title}>
                        <h1 className='font-bold text-[24px] lg:text-[32px] leading-8'>{category?.name}</h1>
                        <p>{products?.meta.total} товаров</p>
                    </div>
                    <div className={styles.content}>
                        <FilterMenu
                            filterOpen={filterOpen}
                            setFilterOpen={setFilterOpen}
                            attributes={attributes}
                            prices={prices}
                            category={category}
                            loading={dataLoading}
                        />
                        <div className={styles.productsColumn}>
                            <SortMenu products={products} productsLoading={isValidating} setFilterOpen={setFilterOpen} />
                            {
                                products ? (
                                    <>
                                        <div className={styles.products}>
                                            {
                                                products?.data.map((info, index) => (
                                                    <ProductTab
                                                        index={index}
                                                        key={info.id}
                                                        product={info}
                                                        setProductId={setProductId}
                                                        productId={productId}
                                                        arrLength={20}
                                                    />
                                                ))
                                            }
                                        </div>
                                        {/* <PageButtons data={products} /> */}
                                    </>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category;
