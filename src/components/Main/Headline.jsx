import Image from 'next/image'
import Link from 'next/link'

import useSWR from 'swr'
import fetcher from '../../utils/fetcher'

import ImageComponent from '../ImageComponent/ImageComponent'
import HeadlineSlider from './HeadlineSlider'

import styles from './Headline.module.scss'

const Headline = () => {
	const { data: sidebanner, error: sidebannerError, isValidating: sidebarValidating, mutate: mutateSidenanner } = useSWR('/banners?type=home_block_1_2',
		(url) =>
			fetcher(url),
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	)

	const { data: slider, error: sliderError, isValidating: sliderValidating, mutate: mutateSlider } = useSWR('/banners?type=home_slide',
		(url) =>
			fetcher(url),
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	)

	return (
		<>
			<div className={styles.container}>
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
				<div className={styles.scroll}>
					{!sliderValidating ?
						(
							slider.data.map((image) => (
								<ImageComponent
									src={image.img}
									key={image.id}
									alt=""
								/>
							))
						) : (null)
					}
				</div>
			</div>
		</>
	)
}

export default Headline
