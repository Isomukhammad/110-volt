import Image from 'next/image'
import Link from 'next/link'
import styles from './BrandTap.module.scss'

const BrandTab = ({ info }) => {
	const { img, name, id, slug } = info;
	return (
		<Link href={`/categories/${id}-${slug}`} className={styles.tab}>
			<Image
				src={img}
				alt={name}
				width='0'
				height='0'
				sizes='100vw'
				className={styles.image}
			/>
		</Link>
	)
}

export default BrandTab