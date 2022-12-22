import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";

import styles from './DiscountTabs.module.scss'

const DiscountTabs = () => {
    const [data] = useState([{
        id: 0,
        name: 'Slide1'
    }, {
        id: 1,
        name: 'Slide2'
    }, {
        id: 2,
        name: 'Slide3'
    }]);

    return (
        <div className={styles.tabs}>
            <Swiper navigation={true} modules={[Navigation]} className={styles.mySwiper}>
                {
                    data.map((i) => (
                        <SwiperSlide key={i.id}>{i.name}</SwiperSlide>
                    ))
                }
                {/* <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide> */}
            </Swiper>
        </div>
    )
}

export default DiscountTabs;
//import React, { useRef, useState } from "react";
// Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";

// import "./styles.css";

// // import required modules
// import { Navigation } from "swiper";

// export default function App() {
//   return (
//     <>
    //   <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
    //     <SwiperSlide>Slide 1</SwiperSlide>
    //     <SwiperSlide>Slide 2</SwiperSlide>
    //     <SwiperSlide>Slide 3</SwiperSlide>
    //     <SwiperSlide>Slide 4</SwiperSlide>
    //     <SwiperSlide>Slide 5</SwiperSlide>
    //     <SwiperSlide>Slide 6</SwiperSlide>
    //     <SwiperSlide>Slide 7</SwiperSlide>
    //     <SwiperSlide>Slide 8</SwiperSlide>
    //     <SwiperSlide>Slide 9</SwiperSlide>
    //   </Swiper>
//     </>
//   );
// }