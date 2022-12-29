import Image from 'next/image';
import data from '../../data.json';
import BrandTab from '../BrandTab/BrandTap';

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import { Pagination, Navigation, Autoplay } from "swiper";

import styles from './BrandCategories.module.scss';

const BrandCategories = () => {
    const { brands } = data;

    return (
        <div className={styles.brands}>
            <h1>Популярные бренды</h1>
            <div className={styles.tabs}>
                <Swiper
                    slidesPerView={4}
                    slidespercolumn={4}
                    spaceBetween={30}
                    slidespercolumnfill='column'
                    loop={true}
                    loopFillGroupWithBlank={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination, Navigation, Autoplay]}
                    className={styles.slider}
                >
                    {
                        brands.map((brand) => (
                            <SwiperSlide key={brand.id} className={styles.swiperSlide}>
                                <BrandTab info={brand} />
                            </SwiperSlide>
                        ))
                    }
                    {
                        brands.slice(0).reverse().map((brand) => (
                            <SwiperSlide key={brand.id} className={styles.swiperSlide}>
                                <BrandTab key={brand.id} info={brand} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

            </div>
        </div>
    )
}

export default BrandCategories;