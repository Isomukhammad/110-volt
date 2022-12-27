import Link from 'next/link';

import ImageComponent from '../ImageComponent/ImageComponent';

import styles from './NewsTab.module.scss'

const NewsTab = ({ image, title, subtitle, id }) => {
    return (
        <Link href={`/news/${id}`} className={styles.container}>
            <ImageComponent
                src={image}
                alt="Изображение новости"
                sizes='100vw'
                width={0}
                height={0}
            />
            <h3>{title}</h3>
            <div>
                <p dangerouslySetInnerHTML={{ __html: subtitle }} />
            </div>
        </Link>
    )
}

export default NewsTab;