//Products list from categories page
import ProductTab from '../ProductTab/ProductTab';

import styles from './ProductsList.module.scss';

const ProductsList = ({ info }) => {
    return (
        <div className={styles.container}>
            {
                info.map((info) => (
                    <ProductTab
                        key={info.id}
                        info={info}
                    />
                ))
            }
        </div>
    )
}

export default ProductsList;