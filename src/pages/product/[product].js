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
import { useLang } from '../../hooks/useLang';

const ProductPage = ({ product }) => {
    const lang = useLang();
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
        if (!productInCart) {
            await handleCart({ type: 'CREATE', product, quantity: 1 })
        }
        router.push('/checkout?instalment=1');
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
                        {},
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
                                <p className={styles.code}>{lang?.['Код товара']}: {product.id}</p>
                            </div>
                        </div>

                        <div className={styles.prices}>
                            {
                                product?.installment_prices[0].prices[0].price_per_month_formatted ? (
                                    <p className={styles.monthly}>
                                        {product?.installment_prices[0].prices[0].price_per_month_formatted}
                                        <span>x {product?.installment_prices[0].prices[0].duration} {lang?.['месяцев']}</span>
                                    </p>
                                ) : (
                                    null
                                )
                            }
                            <p className={styles.currentPrice}>{product.current_price_formatted}</p>
                            <p className={styles.oldPrice}>{product.old_price_formatted}</p>
                        </div>

                        <div className={styles.buttons}>
                            <div
                                loading={cartReqLoading}
                                onClick={() => handleCart({ type: 'SWITCH', product })}
                            >
                                <Button
                                    style={{ width: "fit-content" }}
                                    loading={cartReqLoading.type == 'SWITCH' && cartReqLoading.id == product.id}
                                >
                                    {productInCart ? lang?.['Добавлено в корзину'] : lang?.['Добавить в корзину']}
                                </Button>
                            </div>
                            <Button
                                onClick={() => handleInstantBuy()}
                                variant="cart"
                                active={true}
                            >
                                {lang?.['Купить в рассрочку']}
                            </Button>
                        </div>
                    </div>
                </section>
                <section className={styles.description}>
                    <h1>{lang?.['Описание']}</h1>
                    <div className={isHidden ? `${styles.hide}` : null} dangerouslySetInnerHTML={{ __html: product.body }} />
                    <div>
                        <button onClick={() => { setIsHidden(!isHidden) }}>
                            {
                                isHidden ? lang?.['Читать далее'] : 'Скрыть'
                            }
                        </button>
                    </div>
                </section>

                <div className={styles.bottomButton}>
                    <Button onClick={() => handleCart({ type: 'SWITCH', product })} loading={cartReqLoading.type == 'SWITCH' && cartReqLoading.id == product.id}>
                        {productInCart ? lang?.['В корзине'] : lang?.['в корзину']}
                    </Button>
                </div>
                <ProductCharasteristic data={product} />
                <PopularGoods margin={'80px'} title={lang?.['Популярные товары']} link="/products?is_popular-1&quantity=6" />
                <PopularGoods title={lang?.['Похожие товары']} margin={'80px'} link={`/products/${product.id}/similar?quantity=3`} />
                <DiscountTabs />
            </div >
        </>
    )
}

export const getServerSideProps = async ({ params, locale }) => {
    const product = await nextAxios
        .get(`/products/${params.product.split('-')[0]}`, {
            headers: { 'Accept-Language': locale },
        })
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