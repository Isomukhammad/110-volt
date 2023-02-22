import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";

import { ScreenContext, useMedia } from "../../context/screenContext";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import { Pagination, Navigation, Autoplay, FreeMode } from "swiper";

import styles from './DiscountTabs.module.scss'
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

    const swiperRef = useRef();

    if (!data) {
        return (
            <div className="mt-[64px] lg:mt-[120px] lg:grid lg:grid-cols-2 lg:gap-4">
                <div className="hidden lg:block rounded-[24px] overflow-hidden"><Skeleton height={250} /></div>
                <div className="rounded-[24px] overflow-hidden"><Skeleton height={250} /></div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
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

                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                {
                    data.data.map((item) => (
                        <SwiperSlide className={`${styles.swiperSlide} cursor-grab active:cursor-grabbing`} key={item.id}>
                            <Image src={item.img} alt={item.description} width="0" height="0" sizes="100vw" placeholder="blurDataURL" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default DiscountTabs;