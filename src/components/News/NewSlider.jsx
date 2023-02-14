import { useRef } from 'react';

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

const NewSlider = () => {
    const router = useRouter();
    const { data, error, isValidating } = useSWR(['/publications?type=2&quantity=6', router.locale], (url) => fetcher(url, { headers: { 'Accept-Language': router.locale } }),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )
    const swiperPrevRef = useRef(null);
    const swiperNextRef = useRef(null);

    if (!isValidating) {
        return (
            <div className={styles.container}>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    slidesPerGroup={1}
                    loop={true}
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
                                <NewsTab data={item} />
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
}

export default NewSlider;