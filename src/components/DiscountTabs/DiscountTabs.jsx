import { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import { Pagination, Navigation, Autoplay } from "swiper";

import styles from './DiscountTabs.module.scss'
import Image from "next/image";

const DiscountTabs = () => {
    const swiperRef = useRef();

    return (
        <div className={styles.tabs}>
            <Swiper
                spaceBetween={16}
                slidesPerGroup={1}
                slidesPerView={2} // or 'auto'
                slidesPerColumn={3}
                slidesPerColumnFill="row"
                loop={true}
                loopFillGroupWithBlank={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Navigation, Autoplay]}

                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
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
        </div>
    )
}

export default DiscountTabs;