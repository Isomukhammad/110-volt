import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";

import { ScreenContext } from "../../context/screenContext";

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

const DiscountTabs = () => {
    const router = useRouter();
    const { data, error, isValidating, mutate } = useSWR(['/banners?type=home_block_3_slide', router.locale], (url) => fetcher(url, { headers: { 'Accept-Language': router.locale } }),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );
    const { isMobile } = useContext(ScreenContext)

    const swiperRef = useRef();

    return (
        <>
            {!isValidating ? (
                <div className={styles.container}>
                    <Swiper
                        spaceBetween={16}
                        slidesPerView={isMobile ? 1 : 2}
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

                    {
                        isMobile ? null : (
                            <>
                                <div className={styles.swiperPrev} onClick={() => {
                                    swiperRef.current?.slidePrev()
                                }}>
                                    <svg width={18.67} height={16.33} viewBox='0 0 28 28' fill='none' stroke="white"
                                    >
                                        <use xlinkHref={`#arrow-left`}></use>
                                    </svg>
                                </div>
                                <div className={styles.swiperNext} onClick={() => {
                                    swiperRef.current?.slideNext()
                                }}>
                                    <svg width={18.67} height={16.33} viewBox='0 0 28 28' fill='none' stroke="white"
                                    >
                                        <use xlinkHref={`#arrow-left`}></use>
                                    </svg>
                                </div>
                            </>
                        )
                    }
                </div>
            ) : (null)}
        </>
    )
    // }
}

export default DiscountTabs;