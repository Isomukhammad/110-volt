import news from '../../news.json';
import NewsTab from '../NewsTab/NewsTab'

import styles from './NewsTabs.module.scss';

const NewsTabs = () => {
    return (
        <div className={styles.container}>
            {
                news.map((item) => (
                    <NewsTab
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        title={item.title}
                        subtitle={item.subtitle}
                    />
                ))
            }
        </div>
    )
}

export default NewsTabs; 