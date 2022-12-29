import Link from 'next/link';

import ImageComponent from '../ImageComponent/ImageComponent'

import styles from './MenuCategory.module.scss';

const MenuCategory = ({ catalogues, btn, setMenuOpen }) => {
    const { title, catalogue } = catalogues[btn];
    const { name, link } = catalogue;

    return (
        <div className={styles.category}>
            <div
                className={styles.items}
                onClick={() => setMenuOpen(false)}>
                <h1>{title}</h1>
                <div className={styles.links}>
                    {
                        catalogue.map((item) => (
                            <Link href={item.link} key={item.id}>{item.name}</Link>
                        ))
                    }
                </div>
            </div>
            <div className={styles.img}>
                <div>
                    <ImageComponent src={'/images/Rectangle 15.png'} alt="" width={250} height={400} />
                </div>
                <p>Смартфоны</p>
            </div>
        </div>
    )
}

export default MenuCategory;