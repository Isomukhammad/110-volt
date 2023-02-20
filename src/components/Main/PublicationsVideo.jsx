import { useRouter } from "next/router";
import { useLang } from "../../hooks/useLang";
import useSWR from "swr";

import fetcher from "../../utils/fetcher";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect } from "react";
import { nextAxios } from "../../utils/axios";
import { useMediaQuery } from "react-responsive";
import ImageComponent from "../ImageComponent/ImageComponent";


const disableRevalidation = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: 0,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
}


const PublicationsVideo = () => {
    const isDesktop = useMediaQuery({
        query: '(min-width: 1024px)'
    })
    const router = useRouter();
    const lang = useLang();

    const { data: pubs, error: pubsError, isValidating } = useSWR(['/publications?type=13', router.locale], (url) => fetcher(url, { headers: { 'Accept-Language': router.locale } }), disableRevalidation
    );

    if (isValidating) return (<div>{lang?.['Загрузка…']}</div>)

    return (
        <div className="PublicationsVideo flex flex-col gap-8 lg:gap-10">
            <h1 className="text-[24px] font-bold lg:text-[32px]">Видеообзоры</h1>
            <Swiper
                spaceBetween={16}
                navigation={true}
                slidesPerView={isDesktop ? 6 : 'auto'}
                loopFillGroupWithBlank={true}
                modules={[Pagination, Navigation]}
                className="PublicationsVideo__swiper"
            >
                {
                    pubs.data.map((item) => {
                        return (
                            <SwiperSlide key={item.id}>
                                <ImageComponent
                                    src={item.img}
                                />
                                {item.description}
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    );
}

export default PublicationsVideo;