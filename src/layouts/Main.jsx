import Sprites from "../utils/Sprites";
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"

import styles from './Main.module.scss';
import MobileBottomMenu from "../components/MobileBottomMenu/MobileBottomMenu";

const MainLayout = ({ children }) => {
    return (
        <div className={styles.container} >
            <Sprites />
            <div className={styles.header}>
                <div className={styles.content}>
                    <Header />
                </div>
            </div>
            <div className={styles.children}>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.content}>
                    <Footer />
                </div>
            </div>
            <MobileBottomMenu />
        </div >
    )
}

export default MainLayout;