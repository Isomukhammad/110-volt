import { useContext, useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import { ScreenContext } from "../../context/screenContext";

import ImageComponent from "../ImageComponent/ImageComponent";

import styles from './ProductPageSlider.module.scss'


const ProductPageSlider = ({ images }) => {
    const { isTablet } = useContext(ScreenContext);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [mobileCurrent, setMobileCurrent] = useState(0);
    const [desktopCurrent, setDesktopCurrent] = useState(0);

    const swiperBtnRef = useRef();

    return (
        <div className="Product-page-slider">
            <div className="Product-page-slider__mobile">
                <Swiper
                    spaceBetween={16}
                    slidesPerView={1}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    onSlideChange={(e) => setMobileCurrent(e.realIndex)}
                    modules={[Pagination, Navigation]}
                >
                    {
                        images.map((item, index) => (
                            <SwiperSlide key={index}>
                                <ImageComponent
                                    src={item.original}
                                    placeholder=""
                                    alt=""
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                <div className={styles.slideNumber}>
                    <span className={styles.current}>{mobileCurrent + 1}</span>
                    /
                    <span className={styles.overall}>{images.length}</span>
                </div>
            </div>

            <div className="Product-page-sliper__desktop">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    direction="vertical"
                    spaceBetween={0}
                    slidesPerView="auto"
                    // freeMode={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="Product-page-slider__thumbs"
                >
                    {
                        images.map((item, index) => (
                            <SwiperSlide key={index}>
                                <ImageComponent
                                    src={item.original}
                                    placeholder=""
                                    alt=""
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                <Swiper
                    style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                    }}
                    spaceBetween={10}
                    thumbs={{
                        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                    }}
                    onSlideChange={(e) => setDesktopCurrent(e.realIndex)}
                    modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                    className="Product-page-sliper__mainSlider"

                    onBeforeInit={(swiper) => {
                        swiperBtnRef.current = swiper
                    }}
                >
                    {
                        images.map((item, index) => (
                            <SwiperSlide key={index}>
                                <ImageComponent
                                    src={item.medium}
                                    placeholder=""
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                <div
                    className={`
                    ${styles.thumbsPrev} 
                    ${desktopCurrent === 0 ? styles.disabled : ''}
                    `}
                    onClick={() => {
                        swiperBtnRef.current?.slidePrev()
                    }}
                >
                    <svg
                        width={28}
                        height={28}
                        viewBox='0 0 28 28'
                        fill='none'
                        stroke='#7B54C9'
                    >
                        <use xlinkHref={`#arrow-left`}></use>
                    </svg>
                </div>
                <div
                    className={`
                    ${styles.thumbsNext}
                    ${desktopCurrent + 1 === images.length ? styles.disabled : ''}
                    `}
                    onClick={() => {
                        swiperBtnRef.current?.slideNext()
                    }}
                >
                    <svg
                        width={28}
                        height={28}
                        viewBox='0 0 28 28'
                        fill='none'
                        stroke='#7B54C9'
                    >
                        <use xlinkHref={`#arrow-left`}></use>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default ProductPageSlider;