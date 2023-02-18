import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { useLang } from '../../hooks/useLang';

import fetcher from '../../utils/fetcher';
import { useData } from '../../context/dataContext';

import PagePath from "../../components/PagePath/PagePath";
import HeadInfo from "../../utils/headInfo";
import Button from '../../components/Button/Button';
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import NewsTabs from '../../components/News/NewsTabs'
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs'
import PopularGoods from '../../components/PopularGoods/PopularGoods'
import PageButtons from '../../components/PageButtons/PageButtons';

import styles from './News.module.scss'
import { nextAxios } from '../../utils/axios';

const NewsPage = ({ pageInfo }) => {
    const router = useRouter();
    const lang = useLang();
    const { settings } = useData();
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(router.query.page ? router.query.page : 1);

    const url = useMemo(() => {
        return `/publications?type=2&page=${router.query.page || page}&quantity=${router.query.quantity || 12
            }`
    }, [router.query.page, router.query.quantity, page])

    const { data: publications, error: publicationsError, isValidating, mutate: mutatePublications } = useSWR(
        [url, router.locale],
        url => fetcher(url, { headers: { 'Accept-Language': router.locale } }), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshWhenHidden: 0,
        refreshWhenHidden: false,
        refreshWhenOffline: false,
    })

    if (!isValidating) {
        return (
            <>
                <HeadInfo
                    title={pageInfo.seo_title}
                    description={pageInfo.meta_description}
                    keywords={pageInfo.meta_keywords}
                />
                <PagePath
                    paths={[
                        {
                            "url": "/",
                            "name": lang?.['Главная']
                        },
                        {
                            "url": "",
                            "name": pageInfo.name
                        }
                    ]}
                />
                {
                    publications ? (
                        <div className={styles.container}>
                            <h1 className={`${styles.title} hidden lg:flex font-bold text-[32px]`}>{pageInfo.seo_title}</h1>
                            <div className={styles.headline}>
                                <div className={styles.subtitle}>
                                    <div className={styles.info}>
                                        <h1 className='font-bold text-[24px] lg:text-[32px]'>{lang?.['110 volt - на рынке Узбекистана']}</h1>
                                        <Button variant="news">{lang?.['ПОДРОБНЕЕ']}</Button>
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
                                    <h2 className='font-semibold text-[24px]'>{lang?.['Контакты']}</h2>
                                    <p>По всем интересующим вас вопросом можете обращаться по телефону <Link href={`tel:${settings?.phone}`}><span>{settings?.phone}</span></Link> или написав нам на почту <Link href={`mailto:${settings?.email}`}><span>{settings?.email}</span></Link></p>
                                    <div className={styles.buttons}>
                                        <Link href={`mailto:${settings?.email}`}>
                                            <Button>{lang?.['Написать']}</Button>
                                        </Link>
                                        <Link href={`tel:${settings?.phone}`}>
                                            <Button variant="reverse">{lang?.['Позвонить']}</Button>
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
                                <PopularGoods title={lang?.['Популярные товары']} link="/products?is_popular-1" />
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
                                        <h2 className='text-[24px] font-semibold'>{lang?.['Здесь пока ничего нет']}</h2>
                                        <p>{lang?.['Наши редакторы уже в процессе написания новой статьи']}</p>
                                        <button className='w-full py-4 px-14 bg-accent rounded-[16px] text-white font-semibold hover:bg-accentDark transition duration-300 lg:max-w-[282px]'>{lang?.['Вернуться на главную']}</button>
                                    </div>
                                </div>
                                <PopularGoods title={lang?.['Популярные товары']} link="/products?is_popular-1" />
                                <DiscountTabs />
                            </div>
                        </>
                    )
                }
            </>
        )
    }
}

export const getServerSideProps = async ({ locale }) => {
    const pageInfo = await nextAxios
        .get(`pages/9`, {
            headers: { 'Accept-Language': locale },
        })
        .then((res) => res.data.data)
        .catch((err) => console.error(err))

    if (!pageInfo) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            pageInfo,
        },
    }
}

export default NewsPage;