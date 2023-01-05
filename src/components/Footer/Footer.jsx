import Image from "next/image";
import Link from "next/link";
import FooterCategory from "../FooterCategory/FooterCategory";

import styles from './Footer.module.scss'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <div className={styles.contactUs}>
                    <h2>Свяжитесь с нами</h2>
                    <p>Телефон: <span>+99855 501 56 56</span></p>
                    <p>Режим работы: <span>9:00–21:00</span></p>
                    <p>E-mail: <span>info@110volt.uz</span></p>
                    <p>Адрес: <span>г.Ташкент, ул. А.Навои 24</span></p>
                </div>

                <FooterCategory title="Компания">
                    <Link href="/about">О компании</Link>
                    <Link href="/contacts">Наши контакты</Link>
                    <Link href="/news">Новости</Link>
                    <Link href="/offer">Оферта</Link>
                </FooterCategory>
                <FooterCategory title="Покупатели">
                    <Link href="/">Как оформить заказ</Link>
                    <Link href="/">Условия доставки</Link>
                    <Link href="/">Способы доставки</Link>
                    <Link href="/">Оформление рассрочки</Link>
                </FooterCategory>
                <FooterCategory title="Информация">
                    <Link href="/">Для корпоративных клиентов</Link>
                    <Link href="/">Партнерам</Link>
                </FooterCategory>

                <div className={styles.socials}>
                    <div className={styles.socailLinks}>
                        <div>
                            <svg className={styles.telegramLogo} width="30" height="30" fill="white" viewBox="0 0 40 40">
                                <use xlinkHref="#tg-footer"></use>
                            </svg>
                        </div>
                        <div>
                            <svg className={styles.facebookLogo} width="30" height="30" fill="white" viewBox="0 0 40 40">
                                <use xlinkHref="#fb-footer"></use>
                            </svg>
                        </div>
                        <div>
                            <svg className={styles.instagramLogo} width="30" height="30" fill="white" viewBox="0 0 40 40">
                                <use xlinkHref='#ig-footer'></use>
                            </svg>
                        </div>
                    </div>
                    <Link href="http://inweb.uz/" className={styles.devsMobile}>Разработка -
                        <span>
                            <svg viewBox="0 0 15 18" fill="none" width={15} height={18} className={styles.devLogo}>
                                <use xlinkHref='#dev-logo'></use>
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>

            <div className={styles.additional}>
                <Link href='/'>
                    <Image src={'/images/CompanyLogo2.png'} alt="" width="0" height="0" sizes="100vw" className={styles.image} placeholder="blurDataURL" />
                </Link>
                <p>© 2022 110-volt. Все права защищены</p>
                <Link href="http://inweb.uz/" className={styles.devs}>Разработка -
                    <span>
                        <svg viewBox="0 0 15 18" fill="none" width={15} height={18} className={styles.devLogo}>
                            <use xlinkHref='#dev-logo'></use>
                        </svg>
                    </span>
                </Link>
            </div>
        </footer >
    )
}

export default Footer;