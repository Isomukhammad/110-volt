import useSWR from 'swr';
import Link from 'next/link';
import { useLang } from '../../hooks/useLang';

import fetcher from '../../utils/fetcher';

import styles from './ProductCharasteristic.module.scss';

const ProductCharasteristic = ({ data }) => {
    const lang = useLang();
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

    console.log(attr);

    if (!isValidating) {
        return (
            <div className={styles.container}>
                <div className={styles.background}></div>
                <div className={styles.content}>
                    <h1>{lang?.['Характеристики']}</h1>
                    <div className='flex flex-col gap-4'>
                        {
                            attr?.data.map((item) => (
                                <div key={item.id} className={styles.general}>
                                    <div className={styles.charasteristic}>
                                        <div>
                                            <p>
                                                <span>{item.slug ? item.slug : 'unknown'}</span> <span>
                                                    {
                                                        item.attribute_values.map((char) => (
                                                            <>{char.slug ? char.slug : 'unknown'} </>
                                                        ))
                                                    }
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {/* <Link href='/'>
                        <p>Все характеристики</p>
                        <svg viewBox="0 0 16 13" fill="none" width="16px" height="16px" stroke="#7b54c9">
                            <use xlinkHref='#arrow-right'></use>
                        </svg>
                    </Link> */}
                </div>
            </div>
        )
    }
}

export default ProductCharasteristic;