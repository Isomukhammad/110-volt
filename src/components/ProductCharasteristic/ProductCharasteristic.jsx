import useSWR from 'swr';
import Link from 'next/link';

import fetcher from '../../utils/fetcher';

import styles from './ProductCharasteristic.module.scss';

const ProductCharasteristic = ({ data }) => {
    const { data: attr, error: attrError, isValidating } = useSWR(
        `/products/${data.id}/attributes`, (url) => fetcher(url),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            refreshWhenHidden: 0,
            refreshWhenHidden: false,
            refreshWhenOffline: false,
        }
    )

    if (!isValidating) {
        return (
            <div className={styles.container}>
                <div className={styles.background}></div>
                <div className={styles.content}>
                    <h1>Характеристики</h1>
                    {
                        attr.data.map((item) => (
                            <div key={item.id} className={styles.general}>
                                <h4>{item.name}</h4>
                                <div className={styles.charasteristic}>
                                    {
                                        item.attribute_values.map((char) => (
                                            <div key={char.id}>
                                                <p>
                                                    <span>{char.slug}</span> <span>{char.name}</span>
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }

                    <Link href='/'>
                        <p>Все характеристики</p>
                        <svg viewBox="0 0 16 13" fill="none" width="16px" height="16px" stroke="#7b54c9">
                            <use xlinkHref='#arrow-right'></use>
                        </svg>
                    </Link>
                </div>
            </div>
        )
    }
}

export default ProductCharasteristic;