import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Button from '../Button/Button';
import QuickView from '../QuickView/QuickView';

import styles from './ProductTab.module.scss'
import { ScreenContext } from '../../context/screenContext';

const ProductTab = ({
    index,
    data,
    setProductId,
    productId,
    arrLength
}) => {
    const [quickView, setQuickView] = useState('false');
    const [imgSrc, setImgSrc] = useState(data.img);

    useEffect(() => {
        if (productId === index) {
            setQuickView('true')
        }
    }, [productId, index])

    const { isMobile } = useContext(ScreenContext);
    return (
        <>
            <Link
                href={`/product/${data.id}-${data.slug}`}
                className={styles.container}
            >
                <div className={styles.preview}>
                    <div
                        className={styles.quickReview}
                        onClick={(e) => {
                            e.preventDefault();
                            setProductId(index);
                            setQuickView('true');
                        }}
                    >
                        Быстрый просмотр
                    </div>
                    <div className={styles.image}>
                        <Image
                            src={imgSrc}
                            alt={data.name}
                            sizes="100vh"
                            width={0}
                            height={0}
                            onError={() => {
                                setImgSrc('/images/placeholder.jpg')
                            }}
                        />
                    </div>
                </div>

                <div className={styles.prices}>
                    {
                        data.installment_prices[0] ? (
                            <p>{monthly} сум/мес</p>
                        ) : null
                    }
                    <p>{data.current_price_formatted}</p>
                    <p>{data.old_price_formatted}</p>
                </div>

                <p className={styles.description}>{data.description}</p>

                {
                    isMobile ? (
                        null
                    ) : (
                        <div
                            className={styles.buttons}
                            onClick={(e) => e.preventDefault()}
                        >
                            <div

                            >
                                <Button>
                                    В корзину
                                </Button>
                            </div>
                            <svg
                                viewBox='0 0 24 24'
                                width={24}
                                height={24}
                                fill="none"
                                stroke="#BDBDBD"
                            >
                                <use xlinkHref="#heart"></use>
                            </svg>
                        </div>
                    )
                }
            </Link >
            <QuickView
                setQuickView={setQuickView}
                data={data}
                quickView={quickView}
                index={index}
                productId={productId}
                setProductId={setProductId}
                arrLength={arrLength}
            />
        </>
    )
}

export default ProductTab;