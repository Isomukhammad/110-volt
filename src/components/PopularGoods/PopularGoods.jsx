import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';

import Button from '../Button/Button';
import CategoriesTabsLink from '../CategoriesTabsLink/CategoriesTabLink';
import ImageComponent from '../ImageComponent/ImageComponent';
import ProductTab from '../ProductTab/ProductTab';

import styles from './PopularGoods.module.scss';

const PopularGoods = ({ title, margin, link }) => {
    const router = useRouter();
    const { data: products, error: productsError, mutate: productsMutate, isValidating } = useSWR([link, router.locale], url => fetcher(url, { headers: { 'Accept-Language': router.locale } }), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    const [productId, setProductId] = useState(null);
    const arrLength = products?.data.length;

    if (!isValidating) {
        return (
            <div
                className={styles.container}
                style={{
                    marginTop: `${margin ? `${margin}` : '120px'}`
                }}
            >
                <div className={styles.titleBar}>
                    <h2 className='font-bold text-[24px]'>{title}</h2>
                    <CategoriesTabsLink linkTitle="Все товары" link="/" />
                </div>
                <div className={styles.tabs}>
                    {
                        products.data.map((item, index) => {
                            if (index < 6) {
                                return (
                                    <ProductTab
                                        index={index}
                                        key={item.id}
                                        product={item}
                                        setProductId={setProductId}
                                        productId={productId}
                                        arrLength={arrLength}
                                        width={true}
                                    />
                                )
                            }
                        })
                    }
                </div>
            </div >
        )
    }
}

export default PopularGoods;