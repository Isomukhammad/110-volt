import NewsTab from './NewsTab'

import styles from './NewsTabs.module.scss';

const NewsTabs = ({ data }) => {
    return (
        <div className={styles.container}>
            {
                data.data.map((item) => (
                    <NewsTab
                        key={item.id}
                        data={item}
                    />
                ))
            }
        </div>
    )
}

export default NewsTabs; 