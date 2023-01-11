import Image from 'next/image'
import data from '../../data.json'
import BrandTab from '../BrandTab/BrandTap'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'

import { Pagination, Navigation, Autoplay, Grid } from 'swiper'

import styles from './BrandCategories.module.scss'
import { useContext, useEffect, useRef, useState } from 'react'
import { ScreenContext } from '../../context/screenContext'

const BrandCategories = () => {
	const { isMobile } = useContext(ScreenContext)
	const { brands } = data;
	const brandsRef = useRef();

	return (
		<div className={`brands ${styles.brands}`}>
			<h1>Популярные бренды</h1>
			<div className={styles.tabs}>
				<Swiper
					modules={[Autoplay, Navigation, Grid, Pagination]}
					slidesPerView={isMobile ? 1 : 4}
					spaceBetween={30}
					grid={{
						fill: 'rows',
						rows: 2,
					}}
					loopFillGroupWithBlank={true}
					onSlideChange={(e) => console.log(e.activeIndex)}
					className={styles.slider}

					onBeforeInit={(swiper) => {
						brandsRef.current = swiper;
					}}
				>
					{brands.map((brand) => (
						<SwiperSlide key={brand.id} className={styles.swiperSlide}>
							<BrandTab info={brand} />
						</SwiperSlide>
					))}
					{brands.map((brand) => (
						<SwiperSlide key={brand.id} className={styles.swiperSlide}>
							<BrandTab info={brand} />
						</SwiperSlide>
					))}
					{brands.map((brand) => (
						<SwiperSlide key={brand.id} className={styles.swiperSlide}>
							<BrandTab info={brand} />
						</SwiperSlide>
					))}
				</Swiper>
				<div className={styles.swiperPrev} onClick={() => {
					brandsRef.current?.slidePrev()
				}}>
					<svg width={18.67} height={16.33} viewBox='0 0 28 28' fill='none' stroke="white"
					>
						<use xlinkHref={`#arrow-left`}></use>
					</svg>
				</div>
				<div className={styles.swiperNext} onClick={() => {
					brandsRef.current?.slideNext()
				}}>
					<svg width={18.67} height={16.33} viewBox='0 0 28 28' fill='none' stroke="white"
					>
						<use xlinkHref={`#arrow-left`}></use>
					</svg>
				</div>
			</div>
		</div>
	)
}

export default BrandCategories
