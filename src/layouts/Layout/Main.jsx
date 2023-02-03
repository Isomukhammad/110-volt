import Sprites from "../../utils/Sprites";
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import MobileBottomMenu from "../MobileBottomMenu/MobileBottomMenu";

import styles from './Main.module.scss';

const MainLayout = ({ children }) => {
    return (
        <div className={styles.container} >
            {/* SVGs */}
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

            {/* Bottom menu on mobile devices */}
            <MobileBottomMenu />
        </div >
    )
}

export default MainLayout;