import Link from 'next/link';

import styles from './PagePath.module.scss'

const PagePath = ({ category, subcategory }) => {
    return (
        <div className={styles.container}>
            <div>
                <Link href="/" className={category ? `${styles.active}` : null}>Главная</Link>
            </div>
            {
                category ? (
                    <div className={category ? `${styles.active}` : null}>
                        <svg viewBox='0 0 20 20' width={20} height={20}>
                            <use xlinkHref='#dash'></use>
                        </svg>
                        <Link href="/">{category}</Link>
                    </div>
                ) : null
            }
            {
                subcategory ? (
                    <div className={styles.active}>
                        <svg viewBox='0 0 20 20' width={20} height={20}>
                            <use xlinkHref='#dash'></use>
                        </svg>
                        <Link href={url1?.url}>{subcategory}</Link>
                    </div>
                ) : null
            }
        </div>
    )
}

export default PagePath;