import Link from "next/link";
import { useRef } from "react";

import { useMedia } from "../../context/screenContext";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import { Pagination, Navigation, Autoplay, FreeMode } from "swiper";

import Image from "next/image";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

const DiscountTabs = () => {
    const { isDesktop } = useMedia();

    const router = useRouter();
    const { data, error, isValidating, mutate } = useSWR(['/banners?type=home_block_3_slide', router.locale], (url) => fetcher(url, { headers: { 'Accept-Language': router.locale } }),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const swiperPrevRef = useRef(null);
    const swiperNextRef = useRef(null);

    if (!data) {
        return (
            <div className="mt-[64px] lg:mt-[120px] lg:grid lg:grid-cols-2 lg:gap-4">
                <div className="hidden lg:block rounded-[24px] overflow-hidden"><Skeleton height={250} /></div>
                <div className="rounded-[24px] overflow-hidden"><Skeleton height={250} /></div>
            </div>
        )
    }

    return (
        <div className="DiscountTabs mt-[64px] lg:mt-[120px] relative group">
            <Swiper
                spaceBetween={16}
                slidesPerView={isDesktop ? 2 : 1}
                loop={true}
                loopFillGroupWithBlank={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Navigation, Autoplay, FreeMode]}

                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = swiperPrevRef.current;
                    swiper.params.navigation.nextEl = swiperNextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                className="DiscountTabs__swiper"
            >
                {
                    data.data.map((item) => (
                        <SwiperSlide className={`cursor-grab active:cursor-grabbing`} key={item.id}>
                            <Image src={item.img} alt={item.description} width="0" height="0" sizes="100vw" placeholder="blurDataURL" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <button className="DiscountTabs--button hidden lg:flex absolute top-[50%] left-[-24px] bg-[#23232380] z-[1] p-[14px] rounded-full invisible group:hover-visible" ref={swiperPrevRef} type="button">
                <svg viewBox='0 0 24 24' className="w-7 h-7 stroke-white fill-none"
                >
                    <use xlinkHref={`#arr-left`}></use>
                </svg>
            </button>
            <button className="DiscountTabs--button hidden lg:flex absolute top-[50%] right-[-24px] bg-[#23232380] z-[1] p-[14px] rounded-full" ref={swiperNextRef} type="button">
                <svg width={28} height={28} viewBox='0 0 24 24' className="w-7 h-7 stroke-white fill-none"
                >
                    <use xlinkHref={`#arr-right`}></use>
                </svg>
            </button>
        </div>
    )
}

export default DiscountTabs;