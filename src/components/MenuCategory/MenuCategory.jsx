import Image from 'next/image';
import styles from './MenuCategory.module.scss';

const MenuCategory = ({ }) => {
    return (
        <div className={styles.category}>
            <div>
                <h1>Электроника</h1>
                <p>Гаджеты</p>
            </div>
            <Image src={'/images/Rectangle 15.png'} alt="" width={250} height={400}></Image>
        </div>
    )
}

export default MenuCategory;