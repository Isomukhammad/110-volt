import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';

import HeadInfo from '../../utils/HeadInfo';
import Button from '../../components/Button/Button'
import PopularGoods from '../../components/PopularGoods/PopularGoods';
import ProductCharasteristic from '../../components/ProductCharasteristic/ProductCharasteristic';
import ProductHeader from '../../components/ProductHeader/ProductHeader';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import PagePath from '../../components/PagePath/PagePath';
import ProductPageSlider from '../../components/ProductPageSlider/ProductPageSlider';

import { ScreenContext } from '../../context/screenContext';
import data from '../../products.json';

import styles from './Product.module.scss';

const ProductPage = () => {
    const [isHidden, setIsHidden] = useState(true);
    const [height, setHeight] = useState(0);
    const [show, setShow] = useState('false');
    const { isMobile, isTablet } = useContext(ScreenContext)

    const ref = useRef(null);
    const [product, setProduct] = useState();
    const { query } = useRouter();

    const handleScroll = () => {
        const position = window.pageYOffset + 160;
        setHeight(position);
    };

    const [number, setNunber] = useState();

    useEffect(() => {
        const filter = data.map((item) => {
            const filtered = item.products.find((product) => {
                return product.subtitle == query.product
            })
            return filtered;
        });
        setProduct(filter[0]);
    }, [query])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        if (height >= 680) {
            setShow("true")
        } else {
            setShow("false")
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    })

    return (
        <>
            <HeadInfo title={query.product} />
            {product ? (
                <div className={styles.container}>
                    <ProductHeader product={product} show={show} />
                    <PagePath
                        paths={[
                            {
                                "url": "",
                                "name": "Главная"
                            },
                            {
                                "url": "category/",
                                "name": "Компьютерная техника"
                            },
                            {
                                "url": "category/noutbuki",
                                "name": "Ноутбуки"
                            },
                            {
                                "url": "",
                                "name": `${product?.subtitle}`
                            }
                        ]}
                    />

                    <section className={styles.headline} ref={ref}>
                        <div className={styles.slider}>
                            <ProductPageSlider images={product.img} />
                        </div>

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
                    {
                        isMobile || isTablet ? (
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
                        ) : null
                    }
                    <section className={styles.description}>
                        <h1>Описание</h1>
                        <p className={isHidden ? `${styles.hide}` : null}>{product?.description}</p>
                        <div>
                            <button onClick={() => { setIsHidden(!isHidden) }}>
                                {
                                    isHidden ? 'Читать далее' : 'Скрыть'
                                }
                            </button>
                        </div>
                    </section>

                    <div className={styles.bottomButton}>
                        <Button>В корзину</Button>
                    </div>
                    <ProductCharasteristic />
                    <PopularGoods title={'Популярные товары'} margin={'80px'} />
                    <PopularGoods title={`${!isMobile ? "С этим товаром покупали" : "С этим покупают"}`} margin={'80px'} />
                    <DiscountTabs />
                </div >
            ) : null}
            {/* <PopularGoods /> */}
        </>
    )
}

export default ProductPage;