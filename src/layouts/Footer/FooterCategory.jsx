import { useState } from "react";
import Link from "next/link";

import styles from './FooterCategory.module.scss'
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

const FooterCategory = ({ data }) => {
    const [open, setOpen] = useState(false);
    const { data: category, error: categoryError, isValidating: categoryValidating } = useSWR(`/menus/${data.id}`, (url) => fetcher(url), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshWhenHidden: 0,
        refreshWhenHidden: false,
        refreshWhenOffline: false,
    })

    return (
        <div className={`${styles.container} ${open ? styles.open : ''}`}>
            <div
                className={styles.title}
                onClick={() => {
                    setOpen(!open)
                }}
            >
                <h2 className="font-semibold text-[24px]">{data.name}</h2>
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
                {
                    !categoryValidating ? (
                        category.data.menuItems.map((item) => (
                            <Link href={item.url} key={item.id}>
                                {item.title}
                            </Link>
                        ))
                    ) : (null)
                }
            </div>
        </div>
    );
}

export default FooterCategory;