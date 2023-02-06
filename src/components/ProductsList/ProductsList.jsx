//Products list from categories page
import { useMemo, useState } from 'react';
import ProductTab from '../ProductTab/ProductTab';

import PageButtons from "../../components/PageButtons/PageButtons";

import styles from './ProductsList.module.scss';
import { useRouter } from 'next/router';
import { useParams } from '../../hooks/useParams';
import { useSort } from '../../context/sort';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import Link from 'next/link';

const ProductsList = ({
    category,
}) => {
    const router = useRouter();
    const [productId, setProductId] = useState(null);
    const { view, sortBy } = useSort();
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
            }&page=${router.query.page || 1
            }&quantity=${router.query.quantity || 25}`
    }, [
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

    if (products) {
        return (
            <>
                <div className={styles.container}>
                    {
                        products?.data.map((info, index) => (
                            <ProductTab
                                index={index}
                                key={info.id}
                                product={info}
                                setProductId={setProductId}
                                productId={productId}
                            // arrLength={arrLength}
                            />
                        ))
                    }
                </div>
                <PageButtons data={products} />
            </>
        )
    }
}

export default ProductsList;