import Sprites from "../utils/Sprites";
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"

import styles from './Main.module.scss';

const MainLayout = ({ children }) => {
    return (
        <div className={styles.main} >
            <Sprites />
            <Header />
            <div className={styles.children}>
                {children}
            </div>
            <Footer />
        </div >
    )
}

export default MainLayout;