import { useEffect, useRef } from 'react';

import NewsTab from './NewsTab';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";

import styles from './NewSlider.module.scss';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';

const NewSlider = ({ link }) => {
    const router = useRouter();
    const url = link === 'sales' ? '/promotions?type=active&quantity=6' : '/publications?type=2&quantity=6'

    const { data, error, isValidating } = useSWR([url, router.locale], (url) => fetcher(url, { headers: { 'Accept-Language': router.locale } }),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )
    const swiperPrevRef = useRef(null);
    const swiperNextRef = useRef(null);

    useEffect(() => {

    })

    if (!data || isValidating) {
        return (
            <div className='hidden mt-[120px] lg:grid lg:grid-cols-3 lg:gap-[76px]'>
                {
                    [...Array(3).keys()].map(item => (
                        <div key={item} className={`overflow-hidden rounded-[24px]`}><Skeleton height={350} /></div>
                    ))
                }
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <Swiper
                slidesPerView={3}
                spaceBetween={76}
                slidesPerGroup={1}
                loopFillGroupWithBlank={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                navigation={{
                    prevEl: swiperPrevRef,
                    nextEl: swiperNextRef
                }}
                modules={[Pagination, Navigation, Autoplay]}

                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = swiperPrevRef.current;
                    swiper.params.navigation.nextEl = swiperNextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
            >
                {
                    data.data.map((item) => (
                        <SwiperSlide
                            key={item.id}
                            className={styles.swiperSlide}
                        >
                            <NewsTab data={item} link={link ? link : ''} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <div className={styles.swiperPrev} ref={swiperPrevRef}>
                <svg width={28} height={28} viewBox='0 0 28 28' fill='none' stroke="white"
                >
                    <use xlinkHref={`#arrow-left`}></use>
                </svg>
            </div>
            <div className={styles.swiperNext} ref={swiperNextRef}>
                <svg width={28} height={28} viewBox='0 0 28 28' fill='none' stroke="white"
                >
                    <use xlinkHref={`#arrow-left`}></use>
                </svg>
            </div>
        </div>
    )
}

export default NewSlider;