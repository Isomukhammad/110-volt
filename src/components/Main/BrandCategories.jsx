import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import fetcher from '../../utils/fetcher'
import { ScreenContext } from '../../context/screenContext'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import { Pagination, Navigation, Autoplay, Grid } from 'swiper'
import BrandTab from './BrandTap'
import styles from './BrandCategories.module.scss'

const BrandCategories = () => {
	const router = useRouter();
	const { isMobile } = useContext(ScreenContext)
	// const { brands } = data;
	const brandsRef = useRef();
	const { data: brands, error, mutateBrands } = useSWR(['/brands', router.locale], (url) => fetcher(url, { headers: { 'Accept-Language': router.locale } }))

	if (error)
		return (
			<div>Error loading brands</div>
		)

	return (
		<div className={`brands ${styles.brands}`}>
			<h1 className='font-bold text-[24px] lg:text-[32px]'>Популярные бренды</h1>
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
					className={styles.slider}

					onBeforeInit={(swiper) => {
						brandsRef.current = swiper;
					}}
				>
					{brands?.data.map((brand) => (
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
