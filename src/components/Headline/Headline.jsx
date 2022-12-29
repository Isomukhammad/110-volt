import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import data from '../../data.json'

import styles from './Headline.module.scss'
import Slider from '../Slider/Slider'

const Headline = () => {
	const { slider } = data
	const [image, setImage] = useState(2)
	const imageName = `url("/images/image ${image}.png")`

	return (
		<>
			<div className={styles.headline}>
				<div className={styles.slider}>
					<Slider />
				</div>
				<div className={styles.side}>
					<Link href={'#'} className={styles.sideImg}>
						<Image src={'/images/image 3.png'} alt='img' fill sizes='100vw' />
					</Link>
				</div>
			</div>
		</>
	)
}

export default Headline
