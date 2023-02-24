import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLang } from '../../hooks/useLang';
import FooterCategory from "./FooterCategory";

import styles from './Footer.module.scss'
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { useData } from "../../context/dataContext";

const Footer = () => {
    const router = useRouter();
    const lang = useLang();
    const { settings } = useData();
    const { data: menu, error: menuError, isValidating: menuValidation } = useSWR(['/menus', router.locale], (url) => fetcher(url, { headers: { 'Accept-Language': router.locale } }), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshWhenHidden: 0,
        refreshWhenHidden: false,
        refreshWhenOffline: false,
    });

    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <div className={styles.contactUs}>
                    <h2 className="font-semibold text-[24px]">{lang?.['Свяжитесь с нами']}</h2>
                    <p>{lang?.['Телефон']}: <span><Link href={`tel:${settings?.phone}`}>{settings?.phone}</Link></span></p>
                    <p>{lang?.['Режим работы']}: <span>{settings?.work_hours}</span></p>
                    <p>{lang?.['E-mail']}: <span><Link href={`mailto:${settings?.email}`}>{settings?.email}</Link></span></p>
                    <p>{lang?.['Адрес']}: <span>{settings?.address}</span></p>
                </div>

                {
                    !menuValidation ? (
                        menu.data.map((item, index) => {
                            if (index < 3) {
                                return (
                                    <FooterCategory data={item} key={item.id} />
                                )
                            }
                        })
                    ) : (null)
                }

                <div className={styles.socials}>
                    <div className={styles.socailLinks}>
                        <Link href={settings ? settings.telegram : ''}>
                            <svg className={styles.telegramLogo} width="20" height="17" fill="white" viewBox="0 0 20 17">
                                <use xlinkHref="#tg-footer"></use>
                            </svg>
                        </Link>
                        <Link href={settings ? settings.facebook : '#'}>
                            <svg className={styles.facebookLogo} width="11" height="20" fill="white" viewBox="0 0 11 20">
                                <use xlinkHref="#fb-footer"></use>
                            </svg>
                        </Link>
                        <Link href={settings ? settings.instagram : '#'}>
                            <svg className={styles.instagramLogo} width="20" height="20" fill="white" viewBox="0 0 20 20">
                                <use xlinkHref='#ig-footer'></use>
                            </svg>
                        </Link>
                    </div>
                    <Link href="http://inweb.uz/" className={styles.devsMobile}>{lang?.['Разработка']} -
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
                    <div dangerouslySetInnerHTML={{ __html: settings?.logo_light_svg }}></div>
                </Link>
                <p className="font-medium">© 2022 110-volt. {lang?.['Все права защищены']}</p>
                <Link href="http://inweb.uz/" className={styles.devs}>{lang?.['Разработка']} -
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