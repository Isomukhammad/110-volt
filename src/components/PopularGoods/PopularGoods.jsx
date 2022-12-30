import Link from 'next/link';
import data from '../../data.json';
import Button from '../Button/Button';
import CategoriesTabsLink from '../CategoriesTabsLink/CategoriesTabLink';
import ImageComponent from '../ImageComponent/ImageComponent';

import styles from './PopularGoods.module.scss';

const PopularGoods = ({ title, margin }) => {
    const { popularItems } = data;

    return (
        <div
            className={styles.container}
            style={{
                marginTop: `${margin ? `${margin}` : '120px'}`
            }}
        >
            <div className={styles.titleBar}>
                <h2>{title}</h2>
                <CategoriesTabsLink linkTitle="Все товары" link="/" />
            </div>
            <div className={styles.tabs}>
                {
                    popularItems.map((item) => (
                        <Link key={item.id}
                            href={`/product/${item.name}`}
                            className={styles.tab}
                        >
                            <div className={styles.image}>
                                <ImageComponent
                                    src={item.img}
                                    alt={item.description}
                                    sizes="100vh"
                                    width={0}
                                    height={0}
                                />
                            </div>

                            <div className={styles.prices}>
                                {item.discounted ? (
                                    <p>{item.discounted} сум</p>
                                ) : null}
                                <p>{item.monthly} сум/мес</p>
                                <p>{item.price} сум</p>
                            </div>

                            <p className={styles.description}>{item.description}</p>

                            <div
                                className={styles.buttons}
                                onClick={(e) => e.preventDefault()}
                            >
                                <Button>В корзину</Button>
                                <svg
                                    viewBox='0 0 24 24'
                                    width={24}
                                    height={24}
                                    fill="none"
                                    stroke="#BDBDBD"
                                >
                                    <use xlinkHref="#heart"></use>
                                </svg>
                            </div>


                        </Link >
                    ))
                }
            </div>
        </div >
    )
}

export default PopularGoods;