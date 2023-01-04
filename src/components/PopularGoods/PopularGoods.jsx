import Link from 'next/link';
import { useState } from 'react';
import data from '../../data.json';
import products from '../../products.json';

import Button from '../Button/Button';
import CategoriesTabsLink from '../CategoriesTabsLink/CategoriesTabLink';
import ImageComponent from '../ImageComponent/ImageComponent';
import ProductTab from '../ProductTab/ProductTab';

import styles from './PopularGoods.module.scss';

const PopularGoods = ({ title, margin }) => {
    const [productId, setProductId] = useState(null);
    const arrLength = products[0].products - 1;

    return (
        <div
            className={styles.container}
            style={{
                marginTop: `${margin ? `${margin}` : '120px'}`
            }}
        >
            <div className={styles.titleBar}>
                <h2>{title}</h2>
                <CategoriesTabsLink linkTitle="Все товары" link="/" />
            </div>
            <div className={styles.tabs}>
                {
                    products[0].products.map((item, index) => {
                        if (index < 6) {
                            return (
                                <ProductTab
                                    index={index}
                                    key={item.id}
                                    info={item}
                                    setProductId={setProductId}
                                    productId={productId}
                                    arrLength={arrLength}
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