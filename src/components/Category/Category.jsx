import Link from 'next/link';
import { useMemo, useState } from 'react';
import ProductTab from '../ProductTab/ProductTab';

import PageButtons from "../../components/PageButtons/PageButtons";

import { useRouter } from 'next/router';
import { useParams } from '../../hooks/useParams';
import { useSort } from '../../context/sort';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import PagePath from '../PagePath/PagePath';
import styles from './Category.module.scss';
import FilterMenu from './FilterMenu';
import SortMenu from './SortMenu';

const Category = ({
    category,
}) => {
    const [filterOpen, setFilterOpen] = useState(false)
    const router = useRouter();
    const [productId, setProductId] = useState(null);
    const { quantity, view, sortBy, isPopular, setIsPopular } = useSort();
    const { findParams, updateParams } = useParams()
    // const arrLength = info.length - 1;

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
            }&quantity=${router.query.quantity || quantity}`
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
        <div className={styles.container}>
            <PagePath
                paths={[
                    {
                        "url": "/",
                        "name": "Главная"
                    }, {
                        "url": "#",
                        "name": `Компьютерная техника`
                    }, {

                        "url": "",
                        "name": `Ноутбуки`

                    }
                ]}
            />
            {products ? (
                <div className={styles}>
                    <div className={styles.title}>
                        <h1></h1>
                        <p>458 товаров</p>
                    </div>
                    <div className={styles.content}>
                        <FilterMenu filterOpen={filterOpen} setFilterOpen={setFilterOpen} />
                        <div className={styles.productsColumn}>
                            <SortMenu products={products} productsLoading={isValidating} setFilterOpen={setFilterOpen} />
                            <div className={styles.products}>
                                {
                                    products?.data.map((info, index) => (
                                        <ProductTab
                                            index={index}
                                            key={info.id}
                                            data={info}
                                            setProductId={setProductId}
                                            productId={productId}
                                        // arrLength={arrLength}
                                        />
                                    ))
                                }
                            </div>
                            <PageButtons data={products} />
                        </div>
                    </div>
                </div>
            ) : null
            }
        </div>
    )
}

export default Category;
