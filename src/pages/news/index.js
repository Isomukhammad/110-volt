import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useLang } from '../../hooks/useLang';
import useSWR from 'swr';

import { useData } from '../../context/dataContext';

import { nextAxios } from '../../utils/axios';
import fetcher from '../../utils/fetcher';
import HeadInfo from "../../utils/headInfo";

import Empty from '../../components/Empty/Empty';
import PagePath from "../../components/PagePath/PagePath";
import Button from '../../components/Button/Button';
import NewsTabs from '../../components/News/NewsTabs'
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs'
import PopularGoods from '../../components/PopularGoods/PopularGoods'
import PageButtons from '../../components/PageButtons/PageButtons';

import styles from './News.module.scss'
import Skeleton from 'react-loading-skeleton';
import { useMedia } from '../../context/screenContext';

const NewsPage = ({ pageInfo }) => {
    const router = useRouter();
    const lang = useLang();
    const { isDesktop } = useMedia();
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

    if (!publications || isValidating) {
        return (
            <div className='mt-10 mb-[120px] flex flex-col gap-10'>
                <Skeleton width={300} />
                <Skeleton width={300} height={32} />
                <div className='flex flex-col gap-4 lg:grid lg:grid-cols-2'>
                    <Skeleton height={300} />
                    <Skeleton height={300} />
                </div>
                <div className='flex flex-col gap-16 lg:grid lg:grid-cols-3'>
                    {[...Array(12).keys()].map((item, index) => (
                        <div key={index}><Skeleton height={350} /></div>
                    ))}
                </div>
                <div className='flex flex-col gap-4 lg:flex-row lg:justify-between'>
                    <Skeleton height={32} width={isDesktop ? 300 : null} />
                    <Skeleton height={32} width={isDesktop ? 500 : null} />
                </div>
            </div>
        )
    }

    return (
        <>
            <HeadInfo
                title={pageInfo.seo_title}
                description={pageInfo.meta_description}
                keywords={pageInfo.meta_keywords}
            />
            <div className='mb-[120px]'>
                <PagePath
                    paths={[
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
                                    <p>По всем интересующим вас вопросом можете обращаться по телефону <span>{settings?.phone}</span> или написав нам на почту <span>{settings?.email}</span></p>
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
                        </div>
                    ) : (
                        <>
                            <div className={styles.error}>
                                <Empty
                                    img='/images/News-empty.png'
                                    title={lang?.['Здесь пока ничего нет']}
                                    description={lang?.['Наши редакторы уже в процессе написания новой статьи']}
                                    btnUrl='/'
                                    btnText={lang?.['Вернуться на главную']}
                                />
                            </div>
                        </>
                    )
                }
                <div className='lg:hidden'>
                    <PopularGoods title={lang?.['Популярные товары']} link="/products?is_popular-1" />
                </div>
                <DiscountTabs />
            </div>
        </>
    )
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