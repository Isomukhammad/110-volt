import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { nextAxios } from '../../utils/axios';
import HeadInfo from '../../utils/headInfo';
import Button from '../../components/Button/Button'
import PopularGoods from '../../components/PopularGoods/PopularGoods';
import ProductCharasteristic from '../../components/ProductCharasteristic/ProductCharasteristic';
import ProductHeader from '../../components/ProductHeader/ProductHeader';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import PagePath from '../../components/PagePath/PagePath';
import ProductPageSlider from '../../components/ProductPageSlider/ProductPageSlider';
import styles from './Product.module.scss';
import { useCart } from '../../context/cartContext';
import { isActive } from '../../utils/funcs';
import { useLang } from '../../hooks/useLang';
import { useWish } from '../../context/wishContext';
import { ClipLoader } from 'react-spinners';

const ProductPage = ({ product }) => {
    const lang = useLang();
    const [isHidden, setIsHidden] = useState(true);
    const [height, setHeight] = useState(0);
    const [show, setShow] = useState('false');
    const { handleCart, cartReqLoading, cart, localCart } = useCart();
    const { handleWish, wishReqLoading, wish, localWish } = useWish();

    const store = cart || localCart;
    const productInCart = isActive({
        product: product,
        store: cart,
        localStore: localCart
    })

    const productInWish = isActive({
        product,
        store: wish,
        localStore: localWish,
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
            url: `categories/${cat.id}-${cat.slug}`,
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
                                <p className={styles.code}>{lang?.['?????? ????????????']}: {product.id}</p>
                            </div>
                        </div>

                        <div className={styles.prices}>
                            {
                                product?.installment_prices[0].prices[0].price_per_month_formatted ? (
                                    <p className={styles.monthly}>
                                        {product?.installment_prices[0].prices[0].price_per_month_formatted}
                                        <span>x {product?.installment_prices[0].prices[0].duration} {lang?.['??????????????']}</span>
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
                                <Button active={product.in_stock === 0} loading={cartReqLoading.id == product.id && cartReqLoading.type == 'SWITCH'}>{!productInCart && product.in_stock === 0 ? lang?.['?????? ?? ??????????????'] : productInCart && product.in_stock !== 0 ? lang?.['?????????????????? ?? ??????????????'] : lang?.['???????????????? ?? ??????????????']}</Button>
                            </div>
                            <Button
                                onClick={() => handleInstantBuy()}
                                variant="cart"
                                active={true}
                            >
                                {lang?.['???????????? ?? ??????????????????']}
                            </Button>
                            <button>
                                {
                                    wishReqLoading ? (
                                        <ClipLoader
                                            color="#B5159D"
                                            size={24}
                                        />
                                    ) : (
                                        <svg
                                            viewBox="0 0 24 24"
                                            width="24"
                                            height="24"
                                            fill={productInWish ? "red" : "none"}
                                            stroke={productInWish ? "none" : "#BDBDBD"}
                                            onClick={() => handleWish({ type: 'ADD', product })}
                                        >
                                            <use xlinkHref='#heart'></use>
                                        </svg>

                                    )
                                }
                            </button>
                        </div>
                    </div>
                </section>
                <section className={styles.description}>
                    <h1>{lang?.['????????????????']}</h1>
                    <div className={isHidden ? `${styles.hide}` : null} dangerouslySetInnerHTML={{ __html: product.body }} />
                    <div>
                        <button onClick={() => { setIsHidden(!isHidden) }}>
                            {
                                isHidden ? lang?.['???????????? ??????????'] : ['????????????']
                            }
                        </button>
                    </div>
                </section>

                <div className={styles.bottomButton}>
                    <button className='w-fit'>
                        {
                            wishReqLoading ? (
                                <div className='flex flex-col items-center justify-center'>
                                    <ClipLoader
                                        color="#B5159D"
                                        size={24}
                                    />
                                </div>
                            ) : (
                                <svg
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill={productInWish ? "red" : "none"}
                                    stroke={productInWish ? "none" : "#BDBDBD"}
                                    onClick={() => handleWish({ type: 'ADD', product })}
                                >
                                    <use xlinkHref='#heart'></use>
                                </svg>

                            )
                        }
                    </button>
                    <div className={styles.cartButton}>
                        <Button onClick={() => handleCart({ type: 'SWITCH', product })} loading={cartReqLoading.type == 'SWITCH' && cartReqLoading.id == product.id}>
                            {productInCart ? lang?.['?? ??????????????'] : lang?.['?? ??????????????']}
                        </Button>
                    </div>
                </div>
                <ProductCharasteristic data={product} />
                <PopularGoods title={lang?.['???????????????????? ????????????']} link="/products?is_popular-1&quantity=6" />
                <PopularGoods title={lang?.['?????????????? ????????????']} link={`/products/${product.id}/similar?quantity=6`} />
                <DiscountTabs />
            </div >
        </>
    )
}

export const getServerSideProps = async ({ params, locale }) => {
    const product = await nextAxios
        .get(`products/${params.product.split('-')[0]}`, {
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