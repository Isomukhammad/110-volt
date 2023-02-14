import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

import fetcher from '../../utils/fetcher';
import { useData } from '../../context/dataContext';

import PagePath from "../../components/PagePath/PagePath";
import HeadInfo from "../../utils/HeadInfo";
import Button from '../../components/Button/Button';
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import NewsTabs from '../../components/News/NewsTabs'
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs'
import PopularGoods from '../../components/PopularGoods/PopularGoods'
import PageButtons from '../../components/PageButtons/PageButtons';

import styles from './News.module.scss'

const NewsPage = () => {
    const router = useRouter()
    const { settings } = useData();
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(router.query.page ? router.query.page : 1);

    const url = useMemo(() => {
        return `/publications?type=2&page=${router.query.page || page}&quantity=${router.query.quantity || 12
            }`
    }, [router.query.page, router.query.quantity, page])

    const { data: publications, error: publicationsError, isValidating, mutate: mutatePublications } = useSWR(
        [url, router.locale],
        url => fetcher(url), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshWhenHidden: 0,
        refreshWhenHidden: false,
        refreshWhenOffline: false,
    })

    useEffect(() => {
        setNews((prevVal) => [...prevVal, publications])
    }, [publications])

    console.log(news)

    if (!isValidating) {
        return (
            <>
                <HeadInfo title="Новости" />
                <PagePath
                    paths={[
                        {
                            "url": "/",
                            "name": "Главная"
                        },
                        {
                            "url": "",
                            "name": `Новости`
                        }
                    ]}
                />
                {
                    publications ? (
                        <div className={styles.container}>
                            <h1 className={`${styles.title} hidden lg:flex font-bold text-[32px]`}>Новости</h1>
                            <div className={styles.headline}>
                                <div className={styles.subtitle}>
                                    <div className={styles.info}>
                                        <h1 className='font-bold text-[24px] lg:text-[32px]'>110 volt - на рынке Узбекистана</h1>
                                        <Button variant="news">Подробнее</Button>
                                    </div>
                                    <div className={styles.image}>
                                        <Image
                                            src={'/images/Documents-rafiki 1.png'}
                                            sizes="100vw"
                                            width="0"
                                            height="0"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className={styles.contacts}>
                                    <h2 className='font-semibold text-[24px]'>Контакты</h2>
                                    <p>По всем интересующим вас вопросом можете обращаться по телефону <span>+99855 501 56 56</span> или написав нам на почту <span>info@110volt.uz</span></p>
                                    <div className={styles.buttons}>
                                        <Link href={`mailto:${settings?.email}`}>
                                            <Button>Написать</Button>
                                        </Link>
                                        <Link href={`tel:${settings?.phone}`}>
                                            <Button variant="reverse">Позвонить</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.news}>
                                <NewsTabs data={publications} />
                            </div>

                            <div className={styles.pageButtons}>
                                <PageButtons data={publications} page={page} setPage={setPage} />
                            </div>

                            <div className='lg:hidden'>
                                <PopularGoods title="Популярные товары" link="/products?is_popular-1" />
                            </div>
                            <DiscountTabs />
                        </div>
                    ) : (
                        <>
                            <div className={styles.error}>
                                <div className={styles.content}>
                                    <div>
                                        <ImageComponent
                                            src={'/images/Studying-rafiki 1.png'}
                                            alt=""
                                        />
                                        <h2>Здесь пока ничего нету</h2>
                                        <p>Наши редакторы уже в процессе написания новой статьи</p>
                                        <Link href='/'>
                                            <Button>Вернуться на главную</Button>
                                        </Link>
                                    </div>
                                </div>
                                <PopularGoods title="Популярные товары" link="/products?is_popular-1" />
                                <DiscountTabs />
                            </div>
                        </>
                    )
                }
            </>
        )
    }
}

export default NewsPage;