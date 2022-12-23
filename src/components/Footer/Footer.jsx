import Image from "next/image";
import Link from "next/link";

import styles from './Footer.module.scss'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <div>
                    <h2>Свяжитесь с нами</h2>
                    <p>Телефон: <span>+99855 501 56 56</span></p>
                    <p>Режим работы: <span>9:00–21:00</span></p>
                    <p>E-mail: <span>info@110volt.uz</span></p>
                    <p>Адрес: <span>г.Ташкент, ул. А.Навои 24</span></p>
                </div>

                <div>
                    <h2>Компания</h2>
                    <Link href="/about">О компании</Link>
                    <Link href="/contacts">Наши контакты</Link>
                    <Link href="/">Новости</Link>
                    <Link href="/offer">Оферта</Link>
                </div>

                <div>
                    <h2>Покупатели</h2>
                    <Link href="/">Как оформить заказ</Link>
                    <Link href="/">Условия доставки</Link>
                    <Link href="/">Способы доставки</Link>
                    <Link href="/">Оформление рассрочки</Link>
                </div>

                <div>
                    <h2>Информация</h2>
                    <Link href="/">Для корпоративных клиентов</Link>
                    <Link href="/">Партнерам</Link>
                </div>

                <div className={styles.socials}>
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
            </div>

            <div className={styles.additional}>
                <Image src={'/images/CompanyLogo2.png'} alt="" width="0" height="0" sizes="100vw" className={styles.image} placeholder="blurDataURL" />
                <p>© 2022 110-volt. Все права защищены</p>
                <p className={styles.devs}>Разработка -
                    <span>
                        <svg viewBox="0 0 15 18" fill="none" width={15} height={18} className={styles.devLogo}>
                            <use xlinkHref='#dev-logo'></use>
                        </svg>
                    </span>
                </p>
            </div>
        </footer >
    )
}

export default Footer;