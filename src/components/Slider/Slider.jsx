import { useRef, useState } from 'react';
import Image from 'next/image';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import { Pagination, Navigation, Autoplay, Thumbs, FreeMode } from "swiper";

import { Swiper, SwiperSlide } from 'swiper/react';

import data from '../../data.json';

import styles from './Slider.module.scss';
import ImageComponent from '../ImageComponent/ImageComponent';

const Slider = ({ images }) => {
    const swiperBtnRef = useRef();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className={styles.container}>
            <Swiper
                style={{
                    "--swiper-navigation-color": "black",
                    "--swiper-pagination-color": "black",
                }}
                loop={true}
                spaceBetween={10}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}

                className={`mySwiper2 ${styles.mainSlider}`}
                onBeforeInit={(swiper) => {
                    swiperBtnRef.current = swiper;
                }}
            >
                <SwiperSlide>
                    <Image src={'https://swiperjs.com/demos/images/nature-1.jpg'} sizes="100vw" width={0} height={0} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageComponent src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageComponent src="https://swiperjs.com/demos/images/nature-3.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageComponent src="https://swiperjs.com/demos/images/nature-4.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageComponent src="https://swiperjs.com/demos/images/nature-5.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageComponent src="https://swiperjs.com/demos/images/nature-6.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageComponent src="https://swiperjs.com/demos/images/nature-7.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageComponent src="https://swiperjs.com/demos/images/nature-8.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageComponent src="https://swiperjs.com/demos/images/nature-9.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageComponent src="https://swiperjs.com/demos/images/nature-10.jpg" />
                </SwiperSlide>
                <div className={styles.sliderPrev} onClick={() => {
                    swiperBtnRef.current?.slidePrev()
                }}>
                    <svg width={28} height={28} viewBox='0 0 28 28' fill='none' stroke="white"
                    >
                        <use xlinkHref={`#arrow-left`}></use>
                    </svg>
                </div>
                <div className={styles.sliderNext} onClick={() => {
                    swiperBtnRef.current?.slideNext()
                }}>
                    <svg width={28} height={28} viewBox='0 0 28 28' fill='none' stroke="white"
                    >
                        <use xlinkHref={`#arrow-left`}></use>
                    </svg>
                </div>
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                slidesPerGroup={1}
                loopFillGroupWithBlank={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                className={`mySwiper ${styles.thumbs}`}
            >
                <SwiperSlide>
                    <ImageComponent src={'https://swiperjs.com/demos/images/nature-1.jpg'} />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageComponent src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageComponent src="https://swiperjs.com/demos/images/nature-3.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageComponent src="https://swiperjs.com/demos/images/nature-4.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageComponent src="https://swiperjs.com/demos/images/nature-5.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageComponent src="https://swiperjs.com/demos/images/nature-6.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageComponent src="https://swiperjs.com/demos/images/nature-7.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageComponent src="https://swiperjs.com/demos/images/nature-8.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageComponent src="https://swiperjs.com/demos/images/nature-9.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageComponent src="https://swiperjs.com/demos/images/nature-10.jpg" />
                </SwiperSlide>
                <div className={styles.thumbsPrev} onClick={() => {
                    swiperBtnRef.current?.slidePrev()
                }}>
                    <svg width={28} height={28} viewBox='0 0 28 28' fill='none' stroke="#7B54C9"
                    >
                        <use xlinkHref={`#arrow-left`}></use>
                    </svg>
                </div>
                <div className={styles.thumbsNext} onClick={() => {
                    swiperBtnRef.current?.slideNext()
                }}>
                    <svg width={28} height={28} viewBox='0 0 28 28' fill='none' stroke="#7B54C9"
                    >
                        <use xlinkHref={`#arrow-left`}></use>
                    </svg>
                </div>
            </Swiper>
        </div>
    )
}

export default Slider; 