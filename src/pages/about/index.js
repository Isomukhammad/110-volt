import { useRouter } from "next/router";
import AboutDescription from "../../components/AboutDescription/AboutDescription";
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
            <AboutDescription />
            <DiscountTabs />
        </div>
    )
}

export default AboutPage;