import Sprites from "../utils/Sprites";
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"

import styles from './Main.module.scss';

const MainLayout = ({ children }) => {
    return (
        <div className={styles.main} >
            <Sprites />
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.content}>
                <div className={styles.children}>
                    {children}
                </div>
            </div>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div >
    )
}

export default MainLayout;