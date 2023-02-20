import { useRouter } from "next/router";
import { useLang } from "../../hooks/useLang";

import { useWish } from '../../context/wishContext';

import HeadInfo from "../../utils/headInfo";
import PagePath from "../../components/PagePath/PagePath.jsx";
import Empty from "../../components/Empty/Empty";
import PopularGoods from '../../components/PopularGoods/PopularGoods';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';

const WishesPage = () => {
    const router = useRouter();
    const lang = useLang();

    const { wish, localWish, wishLoading } = useWish();

    const store = wish || localWish;

    if (wishLoading) {
        return (<div>{lang?.['Загрузка…']}</div>)
    }

    if (store && store.items.length == 0) {
        return (
            <Empty
                img="/images/Wish-empty.png"
                title={lang?.['Здесь пока ничего нет']}
                description={lang?.['Загляните а главую или воспользуйтесь поиском']}
                btnUrl='/'
                btnText={lang?.['Вернуться на главную']}
            />
        )
    }

    return (
        <>
            <HeadInfo
                title={lang?.['Избранное']}
            />
            <div className="mb-[120px]">
                <PagePath paths={[
                    {
                        "name": lang?.['Избранное'],
                    }
                ]}
                />
                <div className="mt-10 lg:mt-20">
                    {
                        store && store.items.length === 0 ? (
                            <>
                                <Empty
                                    img={'/images/Wish-empty.png'}
                                    title={lang?.['Здесь пока ничего нет']}
                                    description={lang?.['Загляните а главую или воспользуйтесь поиском']}
                                    btn={{ btnUrl: '/', btnText: lang?.['Вернуться на главную'] }}
                                />
                                <PopularGoods title={lang?.['Популярные товары']} link="/products?is_popular-1&quantity=6" />
                                <DiscountTabs />
                            </>
                        ) : (
                            <div>
                                <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:gap-8">
                                    <h1 className="text-2xl font-bold leading-7 lg:text-[32px]">{lang?.['Избранное']}</h1>
                                    <p className="text-placeholder font-medium">{(lang?.['{{number}} товаров']).replace('{{number}}', wish.quantity)}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default WishesPage;