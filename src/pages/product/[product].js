import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { nextAxios } from '../../utils/axios';
import { ScreenContext } from '../../context/screenContext';
import fetcher from '../../utils/fetcher';
import HeadInfo from '../../utils/HeadInfo';
import Button from '../../components/Button/Button'
import PopularGoods from '../../components/PopularGoods/PopularGoods';
import ProductCharasteristic from '../../components/ProductCharasteristic/ProductCharasteristic';
import ProductHeader from '../../components/ProductHeader/ProductHeader';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import PagePath from '../../components/PagePath/PagePath';
import ProductPageSlider from '../../components/ProductPageSlider/ProductPageSlider';
import styles from './Product.module.scss';
import { useCart } from '../../context/cart';
import { isActive } from '../../utils/funcs';

const ProductPage = ({ product }) => {
    const [isHidden, setIsHidden] = useState(true);
    const [height, setHeight] = useState(0);
    const [show, setShow] = useState('false');
    const { isMobile, isTablet } = useContext(ScreenContext)
    const { handleCart, cartReqLoading, cart, localCart } = useCart();

    const store = cart || localCart;
    const productInCart = isActive({
        product: product,
        store: cart,
        localStore: localCart
    })

    const ref = useRef(null);
    const router = useRouter();

    const handleScroll = () => {
        const position = window.pageYOffset + 160;
        setHeight(position);
    };

    const [number, setNunber] = useState();

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

    const path = product.categories.map((cat) => {
        return {
            url: `/categories/${cat.id}-${cat.slug}`,
            name: cat.name,
        }
    })

    const handleInstantBuy = async () => {
        if (productInCart) {
            return null;
        } else {
            await handleCart({ type: 'CREATE', product, quantity: 1 })
            router.push('/checkout');
        }
    }

    return (
        <>
            <HeadInfo
                title={product.h1_name}
                description={product.meta_description}
                keywords={product.meta_keywords}
            />

            <div className={styles.container}>
                <ProductHeader product={product} show={show} data={product} />
                <PagePath
                    paths={[
                        {
                            "url": "",
                            "name": "Главная"
                        },
                        ...path,
                        {
                            "url": '',
                            "name": product.name
                        }
                    ]}
                />

                <section className={styles.headline} ref={ref}>
                    <div className={styles.slider}>
                        <ProductPageSlider images={product.gallery} />
                    </div>

                    <div className={styles.mainInfo}>
                        <div className={styles.titleInfo}>
                            <h2>{product.h1_name}</h2>
                            <div className={styles.additional}>
                                <p className={styles.brand}>{product.brand_name}</p>
                                <p className={styles.code}>Код товара: {product.id}</p>
                            </div>
                        </div>

                        <div className={styles.prices}>
                            <p className={styles.monthly}>{product?.monthly} сум/мес <span>x 12 месяцев</span></p>
                            <p className={styles.discounted}>{product.current_price_formatted}</p>
                            <p className={styles.price}>{product.old_price_formatted}</p>
                        </div>

                        <div className={styles.buttons}>
                            <div onClick={() => handleCart({ type: 'SWITCH', product })}>
                                <Button
                                    style={{ width: "fit-content" }}
                                >
                                    {productInCart ? 'Уже в корзине' : 'Добавить в корзину'}
                                </Button>
                            </div>
                            <Button
                                onClick={() => handleInstantBuy()}
                                variant="reverse"
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
                                <h2>{product?.h1_name}</h2>
                                <div className={styles.additional}>
                                    <p className={styles.brand}>{product.brand_name}</p>
                                    <p className={styles.code}>Код товара: {product.id}</p>
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
                                    variant="reverse"
                                >
                                    Купить в рассрочку
                                </Button>
                            </div>
                        </div>
                    ) : null
                } */}
                <section className={styles.description}>
                    <h1>Описание</h1>
                    <div className={isHidden ? `${styles.hide}` : null} dangerouslySetInnerHTML={{ __html: product.body }} />
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
                <ProductCharasteristic data={product} />
                <PopularGoods margin={'80px'} title={'Популярные товары'} link="/products?is_popular-1&quantity=6" />
                <PopularGoods title={`${!isMobile ? "С этим товаром покупали" : "С этим покупают"}`} margin={'80px'} link="/products?is_popular-1&quantity=6" />
                <DiscountTabs />
            </div >
        </>
    )
}

export const getServerSideProps = async ({ params }) => {
    const product = await nextAxios
        .get(`/products/${params.product.split('-')[0]}`)
        .then((res) => res.data.data)
        .catch((err) => console.error(err))

    if (!product) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            product,
        },
    }
}

export default ProductPage;