import Image from 'next/image';
import Link from 'next/link';

import HeadInfo from '../../utils/HeadInfo';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import PagePath from '../../components/PagePath/PagePath';
import PopularGoods from '../../components/PopularGoods/PopularGoods';
import Button from '../../components/Button/Button'

import styles from './404.module.scss';

const ErrorPage = () => {
    return (
        <>
            <HeadInfo title="404 error" />
            <div className={styles.container}>
                <PagePath
                    paths={[
                        {
                            "url": "/",
                            "name": "Главная"
                        },
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
                        <h2>Эта страница находится не в нашей вселенной </h2>
                        <p>Нужная вам страница либо удалена либо перемещена по новому адресу</p>
                    </div>
                    <Link href="/">
                        <Button>Вернуться на главную</Button>
                    </Link>
                </div>
                <PopularGoods title={'Популярные товары'} link="/products?is_popular-1&quantity=6" />
                <DiscountTabs />
            </div>
        </>
    )
}

export default ErrorPage;