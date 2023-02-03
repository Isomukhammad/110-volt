import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import ImageComponent from "../ImageComponent/ImageComponent";

import styles from './QuickViewSlider.module.scss'

const QuickViewSlider = ({ data }) => {
    const swiperBtnRef = useRef()
    const [thumbsSwiper, setThumbsSwiper] = useState(null)

    return (
        <div className={styles.container}>
            <Swiper
                loop={true}
                navigation={false}
                modules={[Navigation]}
                thumbs={{
                    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                }}
                className="quick-view__slider"
                onBeforeInit={(swiper) => {
                    swiperBtnRef.current = swiper
                }}
            >
                {
                    data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <ImageComponent src={item.original} alt="" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <button
                className={styles.prevImgBtn}
                onClick={() => {
                    swiperBtnRef.current?.slidePrev()
                }}
            >
                <svg
                    viewBox="0 0 16 13"
                    fill='none'
                    width="24px"
                    height="24px"
                    stroke="#7b54c9"
                >
                    <use xlinkHref='#arrow-right'></use>
                </svg>
            </button>
            <button
                className={styles.nextImgBtn}
                onClick={() => {
                    swiperBtnRef.current?.slideNext()
                }}
            >
                <svg viewBox="0 0 16 13"
                    width={24}
                    height={24}
                    stroke="#7b54c9"
                    fill="none"
                >
                    <use xlinkHref='#arrow-right'></use>
                </svg>
            </button>
        </div>
    );
}

export default QuickViewSlider;