import news from '../../data.json';

import PagePath from "../../components/PagePath/PagePath";
import HeadInfo from "../../utils/HeadInfo";
import Button from '../../components/Button/Button';
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import NewsTabs from '../../components/NewsTabs/NewsTabs'
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs'
import PopularGoods from '../../components/PopularGoods/PopularGoods'

import styles from './News.module.scss'
import Link from 'next/link';
import Image from 'next/image';
import PageButtons from '../../components/PageButtons/PageButtons';

const NewsPage = () => {
    return (
        <>
            <HeadInfo title="Новости" />
            <PagePath category="Новости" />
            {
                news ? (
                    <div className={styles.container}>
                        <h1 className={styles.title}>Новости</h1>
                        <div className={styles.headline}>
                            <div className={styles.subtitle}>
                                <div className={styles.info}>
                                    <h1>110 volt - на рынке Узбекистана</h1>
                                    <Button type="news">Подробнее</Button>
                                </div>
                                <div className={styles.image}>
                                    <Image
                                        src={'/images/Documents-rafiki 1.png'}
                                        sizes="100vw"
                                        width="0"
                                        height="0"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className={styles.contacts}>
                                <h2>Контакты</h2>
                                <p>По всем интересующим вас вопросом можете обращаться по телефону <span>+99855 501 56 56</span> или написав нам на почту <span>info@110volt.uz</span></p>
                                <div className={styles.buttons}>
                                    <Button>Написать</Button>
                                    <Button type="reverse">Позвонить</Button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.news}>
                            <NewsTabs />
                        </div>

                        <div className={styles.pageButtons}>
                            <PageButtons />
                        </div>

                        <DiscountTabs />
                    </div>
                ) : (
                    <div className={styles.error}>
                        <div className={styles.content}>
                            <ImageComponent
                                src={'/images/Studying-rafiki 1.png'}
                                alt=""
                            />
                            <h2>Здесь пока ничего нету</h2>
                            <p>Наши редакторы уже в процессе написания новой статьи</p>
                            <Link href='/'>
                                <Button>Вернуться на главную</Button>
                            </Link>
                        </div>

                        <PopularGoods />
                        <DiscountTabs />
                    </div>
                )
            }
        </>
    )
}

export default NewsPage;