import Link from 'next/link';

import ImageComponent from '../ImageComponent/ImageComponent';

import styles from './NewsTab.module.scss'

const NewsTab = ({ data }) => {
    const { img, name, description, url, id, slug } = data;
    return (
        <Link href={`/news/${id}-${slug}`} className={styles.container}>
            <div className={styles.image}>
                <ImageComponent
                    src={img}
                    alt={slug}
                    sizes='100vw'
                    width={0}
                    height={0}
                />
            </div>
            <h3>{name}</h3>
            <div>
                <p>{description}</p>
            </div>
        </Link>
    )
}

export default NewsTab;