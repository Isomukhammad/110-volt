import { useRouter } from "next/router";
import DiscountTabs from "../../components/DiscountTabs/DiscountTabs";
import PagePath from "../../components/PagePath/PagePath";
import HeadInfo from "../../utils/HeadInfo";

import styles from './about.module.scss'

const AboutPage = () => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <HeadInfo title="О Компании" />
            <PagePath
                paths={[
                    {
                        "url": "/",
                        "name": "Главная"
                    },
                    {
                        "url": "",
                        "name": `О нашей компании`
                    }
                ]}
            />
            <div className={styles.content}>
                <h1 className="font-bold text-[24px] md:text-[32px]">О нашей компании</h1>

                <div className={styles.description}>
                    <p>
                        110volt – это инновационный интернет-магазин, который ориентирован на решение проблем потребителей связанных с покупками бытовых предметов и современной электроники. Каждый день наша команда работает над вопросом «что сделать что бы покупателю было максимально удобно».
                    </p>

                    <p>
                        В нашем онлайн-магазине вы найдёте:
                    </p>

                    <ul>
                        <li>Телефоны и Гаджеты;</li>
                        <li>Крупную и мелкую бытовую технику;</li>
                        <li>Товары красоты и здоровья;</li>
                        <li>Спортинвентарь;</li>
                        <li>Посуду, мебель и многое другое;</li>
                    </ul>

                    <p>
                        Покупки у нас на сайте одно удовольствие так как мы принимаем любой вид оплаты и даже оформим Ваш заказ в РАССРОЧКУ. А наш вежливый персонал круглосуточного call-центра всегда готов дать квалифицированную консультацию.
                    </p>
                </div>
            </div>
            <DiscountTabs />
        </div>
    )
}

export default AboutPage;