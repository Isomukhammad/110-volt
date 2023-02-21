import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import fetcher from '../../utils/fetcher'

import ImageComponent from '../ImageComponent/ImageComponent'
import HeadlineSlider from './HeadlineSlider'

import styles from './Headline.module.scss'
import { useMediaQuery } from 'react-responsive';

const Headline = () => {
	const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
	const router = useRouter();
	const { data: sidebanner, error: sidebannerError, isValidating: sidebarValidating, mutate: mutateSidenanner } = useSWR(['/banners?type=home_block_1_2', router.locale],
		(url,) =>
			fetcher(url, { headers: { 'Accept-Language': router.locale } }),
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	)

	const { data: slider, error: sliderError, isValidating: sliderValidating, mutate: mutateSlider } = useSWR(['/banners?type=home_slide', router.locale],
		(url) =>
			fetcher(url, { headers: { 'Accept-Language': router.locale } }),
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	)

	return (
		<>
			<div className={`Headline ${styles.container}`}>
				{!sliderValidating ? (
					<div className={styles.slider}>
						<HeadlineSlider data={slider} />
					</div>
				) : (null)
				}
				{!sidebarValidating ? (
					<div className={styles.side}>
						<Link href={sidebanner.data[0].url} className={styles.sideImg}>
							<Image src={sidebanner.data[0].img} alt='img' fill sizes='100vw' />
						</Link>
					</div>
				) : (null)
				}
				<div className="Headline__mobile mx-[-2em] overflow-x-hidden md:hidden">
					<Swiper
						spaceBetween={16}
						slidesPerView={1}
					>
						{!sliderValidating ?
							(
								slider.data.map((image) => (
									<SwiperSlide key={image.id}>
										<div className='rounded-[16px] overflow-hidden'>
											<ImageComponent
												src={image.img}
												alt=""
											/>
										</div>
									</SwiperSlide>
								))
							) : (null)
						}
					</Swiper>
				</div>
			</div>
		</>
	)
}

export default Headline
