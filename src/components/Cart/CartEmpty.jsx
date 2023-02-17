import Link from 'next/link';
import { useLang } from '../../hooks/useLang';
import Button from '../Button/Button';
import DiscountTabs from '../DiscountTabs/DiscountTabs';
import ImageComponent from '../ImageComponent/ImageComponent';
import styles from './CartError.module.scss'

const CartEmpty = () => {
    const lang = useLang();
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.image}>
                    <ImageComponent
                        src={'/images/Empty-amico 1.png'}
                        alt=""
                    />
                </div>
                <h2 className='font-semibold text-[24px]'>{lang?.['Здесь пока ничего нет']}</h2>
                <p>{lang?.['Загляните а главую или воспользуйтесь поиском']}</p>
                <Link href="/">
                    <Button>{lang?.['Вернуться на главную']}</Button>
                </Link>
                <div></div>
            </div>
        </div>
    );
}

export default CartEmpty;