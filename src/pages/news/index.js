import HeadInfo from '../../utils/HeadInfo'
import PagePath from '../../components/PagePath/PagePath';
import ImageComponent from '../../components/ImageComponent/ImageComponent';

import styles from './News.module.scss'
import Button from '../../components/Button/Button';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';

const NewsPage = () => {
    return (
        <>
            <HeadInfo title="Новости" />
            <div className={styles.container}>
                <PagePath category="Новости" />
                <h1 className={styles.title}>Новости</h1>
                <div className={styles.headline}>
                    <div className={styles.image}>
                        <div className={styles.info}>
                            <h1>110 volt - на рынке Узбекистана</h1>
                            <Button type="news">Подробнее</Button>
                        </div>
                        <ImageComponent src={'/images/Documents-rafiki 1.png'} />
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
                <DiscountTabs />
            </div>
        </>
    )
}

export default NewsPage;