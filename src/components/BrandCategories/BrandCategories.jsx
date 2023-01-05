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
import { useEffect, useState } from 'react'

const BrandCategories = () => {
	const { brands } = data;
	const [isMobile, setIsMobile] = useState(false)

	//choose the screen size 
	const handleResize = () => {
		if (window.innerWidth <= 480) {
			setIsMobile(true)
		} else {
			setIsMobile(false)
		}
	}

	useEffect(() => {
		window.addEventListener("resize", handleResize)
	})

	useEffect(() => {
		if (window.innerWidth <= 480) {
			setIsMobile(true);
		}
	}, [])

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
					loop={true}
					// loopFillGroupWithBlank={true}
					autoplay={{
						delay: 2000,
						disableOnInteraction: false,
					}}
					className={styles.slider}
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
			</div>
		</div>
	)
}

export default BrandCategories
