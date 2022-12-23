import HeadInfo from '../../utils/HeadInfo'
import PagePath from '../../components/PagePath/PagePath';

const NewsPage = () => {
    return (
        <>
            <HeadInfo title="Новости" />
            <div>
                <PagePath category="Новости" />
            </div>
        </>
    )
}

export default NewsPage;