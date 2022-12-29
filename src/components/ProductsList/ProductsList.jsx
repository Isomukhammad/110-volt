//Products list from categories page
import { useState } from 'react';
import ProductTab from '../ProductTab/ProductTab';

import styles from './ProductsList.module.scss';

const ProductsList = ({ info }) => {
    const [productId, setProductId] = useState(null);
    const arrLength = info.length - 1;

    return (
        <div className={styles.container}>
            {
                info.map((info, index) => (
                    <ProductTab
                        index={index}
                        key={info.id}
                        info={info}
                        setProductId={setProductId}
                        productId={productId}
                        arrLength={arrLength}
                    />
                ))
            }
        </div>
    )
}

export default ProductsList;