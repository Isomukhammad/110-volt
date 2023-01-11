import Link from 'next/link';
import Button from '../Button/Button';
import QuickViewSlider from '../QuickViewSlider/QuickViewSlider';

import styles from './QuickView.module.scss';

const QuickView = ({
    index,
    data,
    quickView,
    setQuickView,
    productId,
    setProductId,
    arrLength
}) => {
    return (
        <div
            className={`
            ${styles.container} 
            ${quickView == 'true' && index == productId ? styles.active : ''}
            `}
            onClick={() => setProductId(null)}
        >
            <div
                className={styles.content}
                onClick={(e) => e.stopPropagation()}
            >
                <QuickViewSlider images={data.img} />
                <div className={styles.information}>
                    <div className={styles.title}>
                        <h2>{data.subtitle}</h2>
                        <p>Код товара: 32207121</p>
                    </div>
                    <div className={styles.buttons}>
                        <Button>Добавить в корзину</Button>
                        <svg
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="#BDBDBD"
                        >
                            <use xlinkHref='#heart'></use>
                        </svg>
                    </div>
                </div>

                <Link href={`/product/${data.subtitle}`} className={styles.moreInfoBtn}>
                    Больше информации
                </Link>

                <button
                    className={`${styles.prevBtn} ${index === 0 ? styles.disabled : ''}`}
                    onClick={() => {
                        if (index !== 0) {
                            setProductId(productId - 1)
                        }
                    }}
                >
                    <svg
                        viewBox="0 0 16 13"
                        fill='none'
                        width="24px"
                        height="24px"
                        stroke="#7b54c9"
                    >
                        <use xlinkHref='#arrow-right'></use>
                    </svg>
                </button>
                <button
                    className={`${styles.nextBtn} ${index === arrLength ? styles.disabled : ''}`}
                    onClick={() => {
                        if (index !== arrLength) {
                            setProductId(productId + 1)
                        }
                    }}
                >
                    <svg viewBox="0 0 16 13"
                        width={24}
                        height={24}
                        stroke="#7b54c9"
                        fill="none"
                    >
                        <use xlinkHref='#arrow-right'></use>
                    </svg>
                </button>
                <button
                    className={styles.closeBtn}
                    onClick={() => setQuickView('flase')}
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="32px"
                        height="32px"
                        fill="#BDBDBD"
                    >
                        <use xlinkHref='#close'></use>
                    </svg>
                </button>
            </div>
        </div >
    )
}

export default QuickView;