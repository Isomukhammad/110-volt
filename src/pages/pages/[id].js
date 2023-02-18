import { useRouter } from "next/router";
import DiscountTabs from "../../components/DiscountTabs/DiscountTabs";
import PagePath from "../../components/PagePath/PagePath";
import { nextAxios } from "../../utils/axios";
import HeadInfo from "../../utils/headInfo";

const AboutPage = ({ page }) => {
    return (
        <div className='mb-20'>
            <HeadInfo
                title={page.seo_title}
                description={page.meta_description}
                keywords={page.meta_keywords}
            />

            <PagePath
                paths={[
                    {
                        "url": "/",
                        "name": "Главная"
                    },
                    {
                        "url": "",
                        "name": page.name
                    }
                ]}
            />

            <div className='flex flex-col gap-12'>
                <h1 className="font-bold text-[24px] md:text-[32px] mt-10">{page.seo_title}</h1>

                <div
                    dangerouslySetInnerHTML={{ __html: page.body }}
                    className='flex flex-col gap-4 font-medium  text-[18px] [&>ul]:pl-7 [&>ul]:list-disc'
                />
            </div>
            <DiscountTabs />
        </div>
    )
}

export const getServerSideProps = async ({ params, locale }) => {
    const page = await nextAxios
        .get(`/pages/${params.id.split('-')[0]}`, {
            headers: { 'Accept-Language': locale },
        })
        .then(res => res.data.data)
        .catch(error => console.error(error))

    if (!page) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            page
        }
    }
}

export default AboutPage;