import { ToastContainer } from "react-toastify";
import Sprites from "../../utils/sprites";
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

            {/* Toast to use accross all app */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="light"
            />
        </div >
    )
}

export default MainLayout;