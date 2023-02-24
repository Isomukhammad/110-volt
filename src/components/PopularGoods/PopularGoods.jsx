import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useMediaQuery } from 'react-responsive';
import useSWR from 'swr';
import { useMedia } from '../../context/screenContext';
import { useLang } from '../../hooks/useLang';
import fetcher from '../../utils/fetcher';

import Button from '../Button/Button';
import CategoriesTabsLink from '../CategoriesTabsLink/CategoriesTabLink';
import ImageComponent from '../ImageComponent/ImageComponent';
import ProductTab from '../ProductTab/ProductTab';

import styles from './PopularGoods.module.scss';

const PopularGoods = ({ title, margin, link }) => {
    const router = useRouter();
    const lang = useLang();
    const { isDesktop } = useMedia();
    const { data: products, error: productsError, mutate: productsMutate, isValidating } = useSWR([link, router.locale], url => fetcher(url, { headers: { 'Accept-Language': router.locale } }), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    const [productId, setProductId] = useState(null);
    const arrLength = products?.data.length;

    if (!products || !title || isValidating) {
        return (
            <div className='mt-[64px] flex flex-col gap-8 lg:mt-[120px] lg:gap-10'>
                <div><Skeleton height={isDesktop ? 32 : 24} width={300} /></div>
                <div className='lg:grid lg:grid-cols-6 gap-4'>
                    {[...Array(isDesktop ? 6 : 1).keys()].map((item) => (
                        <div key={item} className="rounded-[24px] overflow-hidden"><Skeleton height={350} /></div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div
            className={`${styles.container} mt-[64px] lg:mt-[120px]`}
        >
            <div className={styles.titleBar}>
                <h2 className='font-bold text-[24px]'>{isDesktop ? title : title.split(' ')[0]}</h2>
                <CategoriesTabsLink linkTitle={lang?.['Все товары']} link="/" />
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

export default PopularGoods;