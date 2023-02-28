import { useLang } from "../../hooks/useLang";

import { SortProvider } from "../../context/sortContext";

import { nextAxios } from "../../utils/axios";
import HeadInfo from "../../utils/headInfo";

import Brands from "../../components/Brands/Brands";
import PagePath from "../../components/PagePath/PagePath";
import useSWR from "swr";
import { useRouter } from "next/router";
import fetcher from "../../utils/fetcher";

const BrandPage = ({ brand }) => {
    const router = useRouter();
    const lang = useLang();
    const { data: brandTree } = useSWR(
        [`/brands/${brand.id}/categories/tree`, router.locale],
        (url) => fetcher(url, { headers: { 'Accept-Language': router.locale } })
    )

    return (
        <>
            <HeadInfo
                title={brand.seo_title}
                description={brand.meta_description}
                keywords={brand.meta_keywords}
            />
            <PagePath paths={[{ "name": brand.name }]} />
            <SortProvider>
                <Brands brand={brand} tree={brandTree} />
            </SortProvider>
        </>
    );
}

export const getServerSideProps = async ({ params, locale }) => {
    const brand = await nextAxios
        .get(`brands/${params.id.split('-')[0]}`, {
            headers: { 'Accept-Language': locale }
        })
        .then(res => res.data.data)
        .catch(error => console.error(error))

    if (!brand) {
        return {
            notFount: true,
        }
    }

    return {
        props: {
            brand,
        },
    }
}

export default BrandPage;