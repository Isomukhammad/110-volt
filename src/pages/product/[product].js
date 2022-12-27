import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import HeadInfo from '../../utils/HeadInfo';
import ImageComponent from '../../components/ImageComponent/ImageComponent';
import Button from '../../components/Button/Button'
import PopularGoods from '../../components/PopularGoods/PopularGoods';

import data from '../../products.json';

import styles from './Product.module.scss';
import ProductCharasteristic from '../../components/ProductCharasteristic/ProductCharasteristic';

const ProductPage = () => {
    const [product, setProduct] = useState();
    const { query } = useRouter();

    useEffect(() => {
        const filter = data.map((item) => {
            const filtered = item.products.find((product) => {
                return product.subtitle == query.product
            })
            return filtered;
        });
        setProduct(filter[0]);
    }, [query])

    return (
        <>
            <HeadInfo title={query.product} />
            <div className={styles.container}>
                <section className={styles.headline}>
                    <ImageComponent
                        src={'/images/Rectangle 1177.png'} alt="заглушка"
                    />
                    <div className={styles.mainInfo}>
                        <div className={styles.titleInfo}>
                            <h2>{product?.subtitle}</h2>
                            <div className={styles.additional}>
                                <p className={styles.brand}>{product?.brand}</p>
                                <p className={styles.code}>Код товара: 5811965165</p>
                            </div>
                        </div>

                        <div className={styles.prices}>
                            <p className={styles.monthly}>{product?.monthly} сум/мес <span>x 12 месяцев</span></p>
                            <p className={styles.discounted}>{product?.discounted} сум</p>
                            <p className={styles.price}>{product?.price} сум</p>
                        </div>

                        <div className={styles.buttons}>
                            <Button style={{ width: "fit-content" }}>
                                Добавить корзину
                            </Button>
                            <Button
                                type="reverse"
                            >
                                Купить в рассрочку
                            </Button>
                        </div>
                    </div>
                </section>

                <section className={styles.description}>
                    <h1>Описание</h1>
                    <p>{product?.description}</p>
                </section>

                <ProductCharasteristic />
            </div >
            <PopularGoods />
        </>
    )
}

export default ProductPage;