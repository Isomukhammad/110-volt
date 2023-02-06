import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import { Pagination, Navigation, Autoplay, Thumbs, FreeMode } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import styles from './HeadlineSlider.module.scss'


const HeadlineSlider = ({ data }) => {
	const swiperBtnRef = useRef()
	const [thumbsSwiper, setThumbsSwiper] = useState(null)

	return (
		<div className={styles.container}>
			<Swiper
				loop={true}
				spaceBetween={10}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				thumbs={{
					swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
				}}
				modules={[FreeMode, Navigation, Thumbs, Autoplay]}
				className={`mainSlider ${styles.mainSlider}`}
				onBeforeInit={(swiper) => {
					swiperBtnRef.current = swiper
				}}
			>
				{data.data.map((item) => (
					<SwiperSlide key={item.id}>
						<Link href={item.url} className='mainSliderItem'>
							<Image
								src={item.img}
								fill
								sizes='100vw'
								alt={item.description}
								style={{ objectFit: 'cover' }}
							/>
						</Link>
					</SwiperSlide>
				))}

				<div
					className={styles.sliderPrev}
					onClick={() => {
						swiperBtnRef.current?.slidePrev()
					}}
				>
					<svg
						width={28}
						height={28}
						viewBox='0 0 28 28'
						fill='none'
						stroke='white'
					>
						<use xlinkHref={`#arrow-left`}></use>
					</svg>
				</div>
				<div
					className={styles.sliderNext}
					onClick={() => {
						swiperBtnRef.current?.slideNext()
					}}
				>
					<svg
						width={28}
						height={28}
						viewBox='0 0 28 28'
						fill='none'
						stroke='white'
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
				spaceBetween={8}
				slidesPerView={4}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs, Pagination]}
				className={`mainSliderThumbs ${styles.mainSliderThumbs}`}
			>
				{data.data.map((item) => (
					<SwiperSlide key={item.id}>
						<div className='mainSliderThumbsItem'>
							<Image
								src={item.img}
								alt={item.description}
								sizes='100vw'
								fill
								style={{ objectFit: 'cover' }}
							/>
						</div>
					</SwiperSlide>
				))}
				<div
					className={styles.thumbsPrev}
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
					className={styles.thumbsNext}
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
			</Swiper>
		</div>
	)
}

export default HeadlineSlider
