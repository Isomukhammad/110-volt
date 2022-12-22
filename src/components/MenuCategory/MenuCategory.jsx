import Image from 'next/image';
import Link from 'next/link';
import styles from './MenuCategory.module.scss';

const MenuCategory = ({ catalogues, btn }) => {
    console.log(catalogues)
    const { title, catalogue } = catalogues[btn];
    const { name, link } = catalogue;

    return (
        <div className={styles.category}>
            <div className={styles.items}>
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
                <Image src={'/images/Rectangle 15.png'} alt="" width={250} height={400} />
                <p>Смартфоны</p>
            </div>
        </div>
    )
}

export default MenuCategory;