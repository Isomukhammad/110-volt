import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import PagePath from '../../components/PagePath/PagePath';
import PopularTabs from '../../components/PopularTabs/PopularTabs';
import HeadInfo from '../../utils/HeadInfo';
import styles from './404.module.scss';

const ErrorPage = () => {
    return (
        <>
            <HeadInfo title="404 error" />
            <div className={styles.container}>
                <PagePath category="В дальнем космосе" />

                <PopularTabs />
                <DiscountTabs />
            </div>
        </>
    )
}

export default ErrorPage;