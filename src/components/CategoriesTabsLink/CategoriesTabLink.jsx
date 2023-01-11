import Link from "next/link";

import styles from './CategoriesTabLink.module.scss'

const CategoriesTabsLink = ({ linkTitle, link }) => {
    return (
        <Link href={`${link}`} className={styles.link}>
            {linkTitle}
            <span>
                <svg viewBox="0 0 16 13" fill="none" className={styles.arrowIcon} width="16px" height="16px">
                    <use xlinkHref='#arrow-right'></use>
                </svg>
            </span>
        </Link>
    )
}

CategoriesTabsLink.defaultProps = {
    linkTitle: 'Название',
    link: '/'
}

export default CategoriesTabsLink;