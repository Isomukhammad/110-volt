import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import data from '../../data.json'

import styles from './Headline.module.scss'
import Slider from '../Slider/Slider'
import ImageComponent from '../ImageComponent/ImageComponent'

const Headline = () => {
	const { slider } = data
	const [image, setImage] = useState(2)
	const imageName = `url("/images/image ${image}.png")`

	return (
		<>
			<div className={styles.container}>
				<div className={styles.slider}>
					<Slider />
				</div>
				<div className={styles.side}>
					<Link href={'#'} className={styles.sideImg}>
						<Image src={'/images/image 3.png'} alt='img' fill sizes='100vw' />
					</Link>
				</div>
				<div className={styles.scroll}>
					{
						data?.slider.map((image) => (
							<ImageComponent
								src={image.img}
								key={image.id}
								alt=""
							/>
						))
					}
				</div>
			</div>
		</>
	)
}

export default Headline
