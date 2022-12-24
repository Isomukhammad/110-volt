import { useRef, useState } from 'react';
import Image from 'next/image';

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


import { FreeMode, Navigation, Pagination, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

import data from '../../data.json';

import styles from './Slider.module.scss';

const Slider = ({ images }) => {
    const swiperPrevRef = useRef(null);
    const swiperNextRef = useRef(null);

    const [activeThumb, setActiveThumb] = useState();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className={styles.container}>
            <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                className={styles.swiper}
            >
                {
                    images.map((item, index) => (
                        <SwiperSlide key={index} className={styles.swiperSlide}>
                            <Image src={item.img} alt="" width="0" height="0" sizes="100vw" placeholder="blurDataURL" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                className="mySwiper"
            >
                {
                    images.map((item, index) => (
                        <SwiperSlide key={index} className={styles.swiperSlide}>
                            <Image src={item.img} alt="" width={300} height={80} sizes="100vw" placeholder="blurDataURL" />
                        </SwiperSlide>
                    ))
                }
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

export default Slider; 