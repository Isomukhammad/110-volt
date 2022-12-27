import { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Autoplay } from "swiper";

import styles from './DiscountTabs.module.scss'
import Image from "next/image";

const DiscountTabs = () => {
    const swiperPrevRef = useRef(null);
    const swiperNextRef = useRef(null);

    return (
        <div className={styles.tabs}>
            <Swiper
                slidesPerView={2}
                spaceBetween={16}
                slidesPerGroup={1}
                loop={true}
                loopFillGroupWithBlank={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                navigation={{
                    prevEl: swiperPrevRef.current,
                    nextEl: swiperNextRef.current
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"

                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = swiperPrevRef.current;
                    swiper.params.navigation.nextEl = swiperNextRef.current;

                }}
            >
                <SwiperSlide className={styles.swiperSlide}>
                    <Image src="/images/Rectangle 5.png" alt="" width="0" height="0" sizes="100vw" placeholder="blurDataURL" />
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <Image src="/images/Rectangle 6.png" alt="" width="0" height="0" sizes="100vw" placeholder="blurDataURL" />
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <Image src="/images/Rectangle 5.png" alt="" width="0" height="0" sizes="100vw" placeholder="blurDataURL" />
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <Image src="/images/Rectangle 6.png" alt="" width="0" height="0" sizes="100vw" placeholder="blurDataURL" />
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <Image src="/images/Rectangle 5.png" alt="" width="0" height="0" sizes="100vw" placeholder="blurDataURL" />
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <Image src="/images/Rectangle 6.png" alt="" width={792} height={280} />
                </SwiperSlide>
            </Swiper>
            <div className={styles.swiperPrev} ref={swiperPrevRef}>
                <svg width={18.67} height={16.33} viewBox='0 0 28 28' fill='none' stroke="white"
                >
                    <use xlinkHref={`#arrow-left`}></use>
                </svg>
            </div>
            <div className={styles.swiperNext} ref={swiperNextRef}>
                <svg width={18.67} height={16.33} viewBox='0 0 28 28' fill='none' stroke="white"
                >
                    <use xlinkHref={`#arrow-left`}></use>
                </svg>
            </div>
        </div>
    )
}

export default DiscountTabs;