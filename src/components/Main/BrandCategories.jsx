import { useRouter } from 'next/router';
import { useContext, useRef } from 'react';
import { useLang } from '../../hooks/useLang';
import useSWR from 'swr';

import fetcher from '../../utils/fetcher';

import { ScreenContext, useMedia } from '../../context/screenContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { Pagination, Navigation, Autoplay, Grid } from 'swiper';

import BrandTab from './BrandTap';

import styles from './BrandCategories.module.scss';
import Skeleton from 'react-loading-skeleton';

const BrandCategories = () => {
	const { isDesktop } = useMedia();
	const router = useRouter();
	const lang = useLang();
	const { isMobile } = useContext(ScreenContext);
	const { data: brands, error, isValidating } = useSWR(['/brands', router.locale], (url) => fetcher(url, { headers: { 'Accept-Language': router.locale } }));

	const swiperPrevRef = useRef(null);
	const swiperNextRef = useRef(null);

	if (!brands) {
		return (
			<div className='mt-[64px] lg:mt-[120px] flex flex-col gap-6 gap-12'>
				<div><Skeleton width={300} /></div>
				<div className='grid grid-rows-2 gap-4 lg:grid-cols-4'>
					{
						[...Array(isDesktop ? 8 : 2).keys()].map((item, index) => (
							<div key={index} className="rounded-[16px] overflow-hidden">
								<Skeleton height={150} />
							</div>
						))
					}
				</div>
			</div>
		)
	}

	return (
		<div className={`BrandCategories ${styles.brands}`}>
			<h1 className='BrandCategories__title font-bold text-[24px] lg:text-[32px]'>{lang?.['Популярные бренды']}</h1>
			<div className={`${styles.tabs} BrandCategories__slider`}>
				<Swiper
					modules={[Autoplay, Navigation, Grid, Pagination]}
					slidesPerView={!isDesktop ? 1 : 4}
					spaceBetween={30}
					grid={{
						fill: 'rows',
						rows: 2,
					}}
					loopFillGroupWithBlank={true}
					className={styles.slider}

					onInit={(swiper) => {
						swiper.params.navigation.prevEl = swiperPrevRef.current;
						swiper.params.navigation.nextEl = swiperNextRef.current;
						swiper.navigation.init();
						swiper.navigation.update();
					}}
				>
					{brands?.data.map((brand) => (
						<SwiperSlide key={brand.id} className={styles.swiperSlide}>
							<BrandTab info={brand} />
						</SwiperSlide>
					))}
				</Swiper>
				<div className={`${styles.swiperPrev} BrandCategories__slider--button`} ref={swiperPrevRef}>
					<svg width={18.67} height={16.33} viewBox='0 0 28 28' fill='none' stroke="white"
					>
						<use xlinkHref={`#arrow-left`}></use>
					</svg>
				</div>
				<div className={`${styles.swiperNext} BrandCategories__slider--button`} ref={swiperNextRef}>
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
