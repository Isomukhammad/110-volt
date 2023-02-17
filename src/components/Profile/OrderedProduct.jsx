import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useLang } from '../../hooks/useLang';
import { nextAxios } from '../../utils/axios';
import { thousandSeperate } from '../../utils/funcs';
import ImageComponent from '../ImageComponent/ImageComponent'

import styles from './OrderedProduct.module.scss'

const OrderedProduct = ({ data }) => {
    const router = useRouter();
    const lang = useLang();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const hanldeProductGet = async () => {
        try {
            const product = await nextAxios.get(`/products/${data.product_id}`, {
                headers: { 'Accept-Language': router.locale }
            })
            setProduct(product.data.data);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        hanldeProductGet();
    }, []);

    if (isLoading) {
        <div>{<div>{lang?.['Загрузка…"']}</div>}</div>
    } else {
        return (
            <div className={styles.container}>
                <div className={styles.product}>
                    <Link href={`/product/${product.id}-${product.slug}`} className={styles.image}>
                        <ImageComponent src={product.img} />
                    </Link>
                    <Link href={`/product/${product.id}-${product.slug}`} className={styles.title}>
                        <p>{product.h1_name}</p>
                    </Link>
                </div>
                <p className={styles.quantity}>x {data.quantity}</p>
                <p className={styles.price}>{thousandSeperate(data.total)} {lang?.['сум']}</p>
            </div>
        );
    }
}

export default OrderedProduct;