import { useState } from "react";
import Link from "next/link";

import styles from './FooterCategory.module.scss'

const FooterCategory = ({ title, children }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={`${styles.container} ${open ? styles.open : ''}`}>
            <div
                className={styles.title}
                onClick={() => {
                    setOpen(!open)
                }}
            >
                <h2>{title}</h2>
                <div>
                    <svg
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        fill="#BDBDBD"
                    >
                        <use xlinkHref='#arrow-ios-forward'></use>
                    </svg>
                </div>
            </div>
            <div className={styles.links}>
                {children}
            </div>
        </div>
    );
}

export default FooterCategory;