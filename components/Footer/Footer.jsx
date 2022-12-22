import Link from "next/link";

import styles from './Footer.module.scss'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div></div>
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
                    <Link href="/">О компании</Link>
                    <Link href="/">Наши контакты</Link>
                    <Link href="/">Новости</Link>
                    <Link href="/">Оферта</Link>
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

                <div styles={styles.socials}>
                    <svg className={styles.telegramLogo} width="16" height="16">
                        <use xlinkHref="#telegram-logo"></use>
                    </svg>
                    <svg className={styles.facebookLogo} width="16" height="16">
                        <use xlinkHref="#fb-logo"></use>
                    </svg>
                    <svg className={styles.instagramLogo} width="16" height="16">
                        <use xlinkHref='#instagram-logo'></use>
                    </svg>
                </div>
            </div>

            <div className={styles.additional}>
                <svg viewBox="0 0 221 40" width="221" height="40">
                    <use xlinkHref="#footer-logo"></use>
                </svg>
                <p>© 2022 110-volt. Все права защищены</p>
                <p>Разработка -
                    <span>
                        <svg viewBox="0 0 15 18" fill="none" className={styles.devLogo}>
                            <use xlinkHref='#dev-logo'></use>
                        </svg>
                    </span>
                </p>
            </div>
        </footer>
    )
}

export default Footer;