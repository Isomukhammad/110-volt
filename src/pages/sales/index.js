import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import useSWR from "swr";
import { useLang } from "../../hooks/useLang";
import { nextAxios } from "../../utils/axios";
import fetcher from "../../utils/fetcher";
import HeadInfo from "../../utils/headInfo";
import PagePath from "../../components/PagePath/PagePath";
import NewsTabs from '../../components/News/NewsTabs'
import NewsTab from "../../components/News/NewsTab";
import Skeleton from "react-loading-skeleton";

const SalesPage = () => {
    const router = useRouter();
    const lang = useLang();

    const url = useMemo(() => {
        return `/promotions?type=active&page=${router.query.page || 1}&quantity=${router.query.quantity || 12}`
    }, [router.query.page, router.query.quantity])

    const { data: sales, error: salesError, isValidating } = useSWR([url, router.locale], url => fetcher(url, { headers: { 'Accept-Language': router.locale } }), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshWhenHidden: 0,
        refreshWhenHidden: false,
        refreshWhenOffline: false,
    })

    console.log(sales);

    if (!sales || isValidating) {
        return (
            <div className="flex flex-col gap-10 mt-10 mb-[120px]">
                <div><Skeleton width={300} /></div>
                <div><Skeleton width={300} height={32} /></div>
                <div className="flex flex-col gap-[64px] lg:grid lg:grid-cols-3 lg:grid-x-[76px] lg:grid-y-[80px]">{
                    [...Array(12).keys()].map((item) => (
                        <div key={item} className="overflow-hidden rounded-[24px]"><Skeleton height={400} /></div>
                    ))
                }</div>
            </div>
        )
    }

    return (
        <>
            <HeadInfo title={'Акции'} />
            <div className="mb-[120px] flex flex-col gap-10">
                <PagePath paths={[{ "name": "lngАкции" }]} />
                <h1 className="text-[24px] font-semibold lg:text-[32px]">lngАкции</h1>
                <div className="flex flex-col gap-[64px] lg:grid lg:grid-cols-3 lg:grid-x-[76px] lg:grid-y-[80px]">
                    {
                        sales.data.map((item) => (
                            <div key={item.id}>
                                <NewsTab data={item} link="sales" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default SalesPage;