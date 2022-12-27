import Link from 'next/link';
import styles from './ProductCharasteristic.module.scss';

const ProductCharasteristic = () => {
    return (
        <section className={styles.container}>
            <h1>Характеристики</h1>
            <div className={styles.general}>
                <h4>Общие характеристики</h4>
                <div className={styles.charasteristic}>
                    <p>
                        <span>Гарантийный срок</span> <span>1 год</span>
                    </p>
                    <p>
                        <span>Модель</span> <span>S145-15IIL</span>
                    </p>
                    <p>
                        <span>Операционная система </span><span>Windows 10 Home</span>
                    </p>
                    <p>
                        <span>Объем оперативной памяти (ГБ)</span> <span>4 ГБ</span>
                    </p>
                </div>
            </div>

            <div className={styles.general}>
                <h4>Дисплей</h4>
                <div className={styles.charasteristic}>
                    <p>
                        <span>Гарантийный срок</span> <span>1 год</span>
                    </p>
                    <p>
                        <span>Модель</span> <span>S145-15IIL</span>
                    </p>
                    <p>
                        <span>Операционная система </span><span>Windows 10 Home</span>
                    </p>
                    <p>
                        <span>Объем оперативной памяти (ГБ)</span> <span>4 ГБ</span>
                    </p>
                </div>
            </div>

            <Link href='/'>
                <p>Все характеристики</p>
                <svg viewBox="0 0 16 13" fill="none" width="16px" height="16px" stroke="#7b54c9">
                    <use xlinkHref='#arrow-right'></use>
                </svg>
            </Link>
        </section >
    )
}

export default ProductCharasteristic;