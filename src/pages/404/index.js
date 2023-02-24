import { useLang } from '../../hooks/useLang';

import HeadInfo from '../../utils/headInfo';

import PagePath from '../../components/PagePath/PagePath';
import Empty from '../../components/Empty/Empty';
import PopularGoods from '../../components/PopularGoods/PopularGoods';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';

const ErrorPage = () => {
    const lang = useLang();
    return (
        <>
            <HeadInfo title="404 error" />
            <PagePath
                paths={[
                    {
                        "url": "",
                        "name": lang?.["В дальнем космосе"]
                    }
                ]}
            />
            <div className='mb-[120px]'>
                <Empty
                    img="/images/404.png"
                    title={lang?.['Страница не найдена']}
                    description={lang?.['Нужная вам страница либо удалена либо перемещена по новому адресу']}
                    btnUrl='/'
                    btnText={lang?.['Вернуться на главную']}
                    blurDataUrl={'/images/404_placeholder.png'}
                />
                <PopularGoods title={lang?.['Популярные товары']} link="/products?is_popular-1&quantity=6" />
                <DiscountTabs />
            </div>
        </>
    )
}

export default ErrorPage;