import styles from './PageButtons.module.scss'

const PageButtons = () => {
    return (
        <div className={styles.container}>
            <div className={styles.numbers}>
                <button className={styles.prevPage}>
                    <svg
                        viewBox="0 0 17 16"
                        width={17}
                        height={16}
                        fill="none"
                        stroke="#828282"
                    >
                        <use xlinkHref="#arrow-right"></use>
                    </svg>
                </button>
                <button className={styles.active}><span>1</span></button>
                <button><span>2</span></button>
                <button><span>3</span></button>
                <button><span>...</span></button>
                <button><span>998</span></button>
                <button><span>999</span></button>
                <button className={styles.nextPage}>
                    <svg
                        viewBox="0 0 17 16"
                        width={17}
                        height={16}
                        fill="none"
                        stroke="#828282"
                    >
                        <use xlinkHref="#arrow-right"></use>
                    </svg>
                </button>
            </div>
            <div className={styles.showMore}>
                Показать ещё
            </div>
        </div>
    )
}

export default PageButtons;