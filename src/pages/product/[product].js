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
import { nextAxios } from '../../utils/axios';
import fetcher from '../../utils/fetcher';

const ProductPage = ({ productss }) => {
    const [isHidden, setIsHidden] = useState(true);
    const [height, setHeight] = useState(0);
    const [show, setShow] = useState('false');
    const { isMobile, isTablet } = useContext(ScreenContext)

    // meta_description
    // meta_keywords


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

    const path = productss.categories.map((cat) => {
        return {
            url: `/categories/${cat.id}-${cat.slug}`,
            name: cat.name,
        }
    })

    return (
        <>
            <HeadInfo
                title={productss.h1_name}
                description={productss.meta_description}
                keywords={productss.meta_keywords}
            />

            <div className={styles.container}>
                <ProductHeader product={product} show={show} data={productss} />
                <PagePath
                    paths={[
                        {
                            "url": "",
                            "name": "Главная"
                        },
                        ...path,
                        {
                            "url": '',
                            "name": productss.name
                        }
                    ]}
                />

                <section className={styles.headline} ref={ref}>
                    <div className={styles.slider}>
                        <ProductPageSlider images={productss.gallery} />
                    </div>

                    <div className={styles.mainInfo}>
                        <div className={styles.titleInfo}>
                            <h2>{productss.h1_name}</h2>
                            <div className={styles.additional}>
                                <p className={styles.brand}>{productss.brand_name}</p>
                                <p className={styles.code}>Код товара: {productss.id}</p>
                            </div>
                        </div>

                        <div className={styles.prices}>
                            <p className={styles.monthly}>{product?.monthly} сум/мес <span>x 12 месяцев</span></p>
                            <p className={styles.discounted}>{productss.current_price_formatted}</p>
                            <p className={styles.price}>{productss.old_price_formatted}</p>
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
                {/* {
                    isMobile || isTablet ? (
                        <div className={styles.mainInfo}>
                            <div className={styles.titleInfo}>
                                <h2>{productss?.h1_name}</h2>
                                <div className={styles.additional}>
                                    <p className={styles.brand}>{productss.brand_name}</p>
                                    <p className={styles.code}>Код товара: {productss.id}</p>
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
                } */}
                <section className={styles.description}>
                    <h1>Описание</h1>
                    <div className={isHidden ? `${styles.hide}` : null} dangerouslySetInnerHTML={{ __html: productss.body }} />
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
                <ProductCharasteristic data={productss} />
                <PopularGoods margin={'80px'} title={'Популярные товары'} link="/products?is_popular-1&quantity=6" />
                <PopularGoods title={`${!isMobile ? "С этим товаром покупали" : "С этим покупают"}`} margin={'80px'} link="/products?is_popular-1&quantity=6" />
                <DiscountTabs />
            </div >
        </>
    )
}

export const getServerSideProps = async ({ params }) => {
    const productss = await nextAxios
        .get(`/products/${params.product.split('-')[0]}`)
        .then((res) => res.data.data)
        .catch((err) => console.error(err))

    if (!productss) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            productss,
        },
    }
}

export default ProductPage;