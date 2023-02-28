import DiscountTabs from "../../components/DiscountTabs/DiscountTabs";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import NewSlider from "../../components/News/NewSlider";
import PagePath from "../../components/PagePath/PagePath";
import PopularGoods from "../../components/PopularGoods/PopularGoods";
import { useLang } from "../../hooks/useLang";
import { nextAxios } from "../../utils/axios";
import HeadInfo from "../../utils/headInfo";

const SalePage = ({ prom }) => {
    const lang = useLang();
    return (
        <>
            <HeadInfo
                title={prom.seo_title}
                description={prom.meta_description}
                keywords={prom.meta_keywords}
            />
            <PagePath paths={[
                { "url": "sales", "name": "lngАкции" },
                { "name": prom.seo_title }
            ]} />
            <div className="mt-10">
                <h1 className='font-bold text-[24px] lg:text-[32px]'>{prom.seo_title}</h1>
                <div className="mt-8 [&>img]:max-w-[840px] lg:mt-10">
                    <ImageComponent
                        src={prom.img}
                        alt={prom.name}
                    />
                </div>
                <section className="mt-12 flex flex-col gap-8 text-[18px] lg:mt-20 lg:font-medium" dangerouslySetInnerHTML={{ __html: prom.body }} />
            </div>
            <div className="lg:hidden"><PopularGoods title={lang?.['Популярные товары']} link="/products?is_popular-1&quantity=6" /></div>
            <div className="lg:hidden"><DiscountTabs /></div>
            <div className="mb-[120px]"><NewSlider link="sales" /></div>
        </>
    );
}

export const getServerSideProps = async ({ locale, params }) => {
    const prom = await nextAxios
        .get(`promotions/${params.id.split('-'[0])}`, {
            headers: { 'Accept-Language': locale }
        })
        .then(res => res.data.data)
        .catch(error => console.error(error));

    if (!prom) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            prom
        }
    }
}

// export async function getServerSideProps({ params, locale }) {
//     const pub = await nextAxios
//         .get(`publications/${params.id.split('-')[0]}`, {
//             headers: { 'Accept-Language': locale }
//         })
//         .then((res) => res.data.data)
//         .catch((err) => console.error(err))

//     if (!pub) {
//         return {
//             notFound: true,
//         }
//     }

//     return {
//         props: {
//             pub,
//         },
//     }
// }

export default SalePage;