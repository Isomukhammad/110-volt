import { nextAxios } from '../../utils/axios';

import PagePath from '../../components/PagePath/PagePath';
import HeadInfo from '../../utils/HeadInfo';
import ImageComponent from '../../components/ImageComponent/ImageComponent';
import NewSlider from '../../components/News/NewSlider';

import styles from './Article.module.scss'
import PopularGoods from '../../components/PopularGoods/PopularGoods';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import { useLang } from '../../hooks/useLang';

const NewsBlog = ({ pub }) => {
    const lang = useLang();
    return (
        <>
            <HeadInfo title="Новости" />
            <PagePath
                paths={[
                    {},
                    {
                        "url": "",
                        "name": lang?.['Новости']
                    }
                ]}
            />
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className='font-bold text-[24px] lg:text-[32px]'>{pub.seo_title}</h1>
                    <ImageComponent
                        src={pub.img}
                        alt="Image of news"
                    />
                    <div
                        className={`${styles.description} lg:font-medium`}
                        dangerouslySetInnerHTML={{ __html: pub.body }}
                    />
                </div>

                <div className={styles.ads}>
                    <PopularGoods title={lang?.['Популярные товары']} link="/products?is_popular-1&quantity=6" />
                    <DiscountTabs />
                </div>

                <NewSlider />
            </div>
        </>
    )
}

export async function getServerSideProps({ params, locale }) {
    const pub = await nextAxios
        .get(`/publications/${params.id.split('-')[0]}`, {
            headers: { 'Accept-Language': locale }
        })
        .then((res) => res.data.data)
        .catch((err) => console.error(err))

    if (!pub) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            pub,
        },
    }
}

export default NewsBlog;