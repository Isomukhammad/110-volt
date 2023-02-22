import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';
import styles from './BrandTap.module.scss'

const BrandTab = ({ info }) => {
	const { img, name, id, slug } = info;
	const { imgSrc, setImgSrc } = useState(img);
	return (
		<Link href={`/categories/${id}-${slug}`} className={styles.tab}>
			<Image
				src={imgSrc || '/images/placeholder.jpg'}
				alt={name}
				width='0'
				height='0'
				sizes='100vw'
				className={styles.image}
				onError={() => {
					setImgSrc('/images/placeholder.jpg')
				}}
			/>
		</Link>
	)
}

export default BrandTab
