import Sprites from "../utils/Sprites";
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"

import styles from './Main.module.scss';

const MainLayout = ({ children }) => {
    return (
        <div>
            <Sprites />
            <Header />
            <div className={styles.main}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout;