import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '../../hooks/useLang';

import HeadInfo from '../../utils/HeadInfo';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import PagePath from '../../components/PagePath/PagePath';
import PopularGoods from '../../components/PopularGoods/PopularGoods';
import Button from '../../components/Button/Button'

import styles from './404.module.scss';

const ErrorPage = () => {
    const lang = useLang();
    return (
        <>
            <HeadInfo title="404 error" />
            <div className={styles.container}>
                <PagePath
                    paths={[
                        {},
                        {
                            "url": "",
                            "name": "В дальнем космосе"
                        }
                    ]}
                />
                <div className={styles.image}>
                    <Image
                        src={"/images/404 error lost in space-rafiki 1.png"}
                        alt="Error Image"
                        sizes="100vw"
                        width={0}
                        height={0}
                        placeholder="blurDataURL"
                    />
                    <div className={styles.info}>
                        <h2 className='font-semibold text-[28px]'>{lang?.['Страница не найдена']}</h2>
                        <p>{lang?.['Нужная вам страница либо удалена либо перемещена по новому адресу']}</p>
                    </div>
                    <Link href="/">
                        <Button>{lang?.['Вернуться на главную']}</Button>
                    </Link>
                </div>
                <PopularGoods title={lang?.['Популярные товары']} link="/products?is_popular-1&quantity=6" />
                <DiscountTabs />
            </div>
        </>
    )
}

export default ErrorPage;