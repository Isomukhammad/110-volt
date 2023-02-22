import { useRouter } from "next/router";
import { useLang } from "../../hooks/useLang";
import useSWR from "swr";

import fetcher from "../../utils/fetcher";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";
import { nextAxios } from "../../utils/axios";
import { useMediaQuery } from "react-responsive";
import ImageComponent from "../ImageComponent/ImageComponent";
import Skeleton from "react-loading-skeleton";


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
    const [videoOpen, setVideoOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);

    useEffect(() => {
        if (videoOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "scroll"
        }
    }, [videoOpen]);

    const { data: pubs, error: pubsError, isValidating } = useSWR(['/publications?type=13', router.locale], (url) => fetcher(url, { headers: { 'Accept-Language': router.locale } }), disableRevalidation
    );

    const swiperPrevRef = useRef(null);
    const swiperNextRef = useRef(null);

    if (!pubs || isValidating) return (
        <div className='mt-[64px] flex flex-col gap-6 lg:mt-[120px] lg:black lg:gap-12'>
            <Skeleton width={300} height={30} />
            <div className='lg:grid lg:grid-cols-3 gap-4'>
                <div className="rounded-[24px] overflow-hidden"><Skeleton height={450} /></div>
                <div className="rounded-[24px] overflow-hidden hidden lg:block"><Skeleton height={450} /></div>
                <div className="rounded-[24px] overflow-hidden hidden lg:block"><Skeleton height={450} /></div>
            </div>
        </div>
    )

    return (
        <div className="PublicationsVideo relative flex flex-col gap-8 lg:gap-10">
            <h1 className="text-[24px] font-bold lg:text-[32px]">{lang?.['Видеообзоры']}</h1>
            <div className="PublicationsVideo__slider relative">
                <Swiper
                    spaceBetween={16}
                    slidesPerView={isDesktop ? 3 : 'auto'}
                    loopFillGroupWithBlank={true}
                    navigation={{
                        prevEl: swiperPrevRef,
                        nextEl: swiperNextRef
                    }}
                    modules={[Pagination, Navigation]}
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = swiperPrevRef.current;
                        swiper.params.navigation.nextEl = swiperNextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                    className="PublicationsVideo__swiper"
                >
                    {
                        pubs.data.map((item, index) => {
                            if (item.video_code) {
                                return (
                                    <SwiperSlide
                                        key={item.id}
                                        onClick={() => {
                                            setVideoUrl(item.video_code)
                                            setVideoOpen(true)
                                        }}
                                    >
                                        <ImageComponent
                                            src={item.img}
                                            alt={item.name}
                                        />
                                        <h3 className="text-[20px] font-semibold">{item.name}</h3>
                                        <p className="line-clamp-2 font-normal text-secondary text-[18px]">
                                            {item.description}
                                        </p>
                                    </SwiperSlide>
                                )
                            }
                        })
                    }
                </Swiper>
                <button className="hidden lg:flex PublicationsVideo__slider--button absolute top-[50%] left-[-24px] bg-white z-[1] p-[14px] rounded-full" ref={swiperPrevRef}>
                    <svg width={28} height={28} viewBox='0 0 28 28' className="w-7 h-7 stroke-accent fill-none"
                    >
                        <use xlinkHref={`#arrow-left`}></use>
                    </svg>
                </button>
                <button className="hidden lg:flex PublicationsVideo__slider--button absolute top-[50%] right-[-24px] bg-white z-[1] p-[14px] rounded-full" ref={swiperNextRef}>
                    <svg width={28} height={28} viewBox='0 0 28 28' className="w-7 h-7 stroke-accent fill-none"
                    >
                        <use xlinkHref={`#arr-right`}></use>
                    </svg>
                </button>
            </div>
            {
                videoOpen ? (
                    <div
                        className="PublicationsVideo__video z-[2] fixed w-full h-full bg-[#00000040] top-0 left-0 flex flex-col items-center justify-center"
                        onClick={() => setVideoOpen(false)}
                    >
                        <div className="PublicationsVideo__video__wrapper">
                            <div dangerouslySetInnerHTML={{ __html: videoUrl }} />
                        </div>
                    </div>
                ) : null
            }
        </div>
    );
}

export default PublicationsVideo;