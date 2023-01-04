import ImageComponent from '../ImageComponent/ImageComponent';
import styles from './CartItem.module.scss'

const CartItem = ({ info }) => {
    return (
        <div className={styles.container}>
            <div className={styles.product}>
                <ImageComponent
                    src={info.img[0]}
                    alt="Product image"
                />
                <div className={styles.title}>{info.subtitle}</div>
            </div>
            <div className={styles.quantity}>
                <button>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#242424" xmlns="http://www.w3.org/2000/svg">
                        <use xlinkHref='#minus'></use>
                    </svg>
                </button>
                <div className={styles.number}>
                    <span>0</span>
                    <hr />
                </div>
                <button>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#242424" xmlns="http://www.w3.org/2000/svg">
                        <use xlinkHref='#plus'></use>
                    </svg>
                </button>
            </div>
            <div className={styles.prices}>
                <div className={styles.monthly}>{info.monthly} сум/мес<span>x 12 месяцев</span>
                </div>
                <div className={styles.discounted}>{info.discounted} сум</div>
                <div className={styles.price}>{info.price} сум</div>
            </div>
        </div>
    );
}

export default CartItem;