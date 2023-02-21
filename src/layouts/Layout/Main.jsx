import { useMediaQuery } from "react-responsive";
import { ToastContainer, Zoom } from "react-toastify";
import Sprites from "../../utils/sprites";
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import MobileBottomMenu from "../MobileBottomMenu/MobileBottomMenu";

import styles from './Main.module.scss';

const MainLayout = ({ children }) => {
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
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
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                limit={isDesktop ? null : 1}
                transition={Zoom}
                rtl={false}
                draggable
                theme="light"
            />
        </div >
    )
}

export default MainLayout;