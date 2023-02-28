import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useEffect, useMemo, useState } from "react";
import { useLang } from "../../hooks/useLang";
import useSWR from "swr";

import { useSort } from "../../context/sortContext";

import ProductTab from '../ProductTab/ProductTab';

import fetcher from "../../utils/fetcher";
import PageButtons from "../PageButtons/PageButtons";
import Skeleton from "react-loading-skeleton";
import SortMenu from "../Category/SortMenu";

const Brands = ({ brand, tree }) => {
    const router = useRouter();
    const lang = useLang();
    const { setIsPopular, isPopular, sortBy, setSortBy } = useSort();
    const [filterOpen, setFilterOpen] = useState(false);
    const [productId, setProductId] = useState(null);
    const [page, setPage] = useState(null);
    const [productsList, setProductsList] = useState(null);

    const url = useMemo(() => {
        return `/products?page=${!page ? router.query.page : page}&order_by=${sortBy.by}&order_direction=${sortBy.direction}&quantity=${router.query.quantity || 20}&brands[]=${brand.id}&category_id=13`
    }, [
        router.query.page,
        router.query.quantity,
        sortBy,
        brand,
        page
    ])

    const {
        data: products,
        isValidation,
        mutate: mutateProducts
    } = useSWR([url, router.locale],
        (url) => fetcher(url, { headers: { 'Accept-Language': router.locale } }),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )

    useEffect(() => {
        if (products) {
            if (page) {
                setProductsList(prevVal => [...prevVal, ...products.data])
            } else {
                setProductsList(products.data);
            }
        }
    }, [products])

    return (
        <div className="Brands relative">
            <div className="mt-10 flex flex-col gap-2 lg:flex-row lg:gap-8 lg:items-center">
                <h1 className="text-[24px] font-bold lg:text-[32px]">{brand?.name}</h1>
                {lang ? (<p className="text-[14px] font-medium text-placeholder lg:text-[16px]">{(lang?.['{{number}} товаров']).replace('{{number}}', products?.meta.total)}</p>) : null}
            </div>
            <div className="lg:grid lg:grid-cols-[16.6%_80%] lg:gap-[30px] lg:mt-10">
                <div className={`fixed lg:relative flex flex-col gap-6 bg-white w-full h-full top-0 ${filterOpen ? 'left-0 lg:left-0' : 'left-[100%] lg:left-0'} z-[10] py-8 lg:py-0 px-[2em] transition-all duration-300 lg:w-fit lg:h-fit lg:px-0`}>
                    <h3 className="text-[24px] font-semibold lg:hidden">{lang?.['Фильтры']}</h3>
                    <div className="flex flex-col gap-10">
                        {
                            tree ? (
                                tree.data.map((cat) => (
                                    <div key={cat.id}>
                                        <div
                                            className="text-[20px] font-semibold"
                                        >{cat.name}</div>

                                        {cat.children.length > 0 && (
                                            <ul className="ml-4 mt-2 flex flex-col gap-2">
                                                {cat.children.map((subcat) => (
                                                    <li key={subcat.id}>
                                                        <Link
                                                            href={`/categories/${subcat.id}-${subcat.slug}/brand=${brand.id}-${brand.slug}`}
                                                            className="hover:text-accent transition duration-300 font-medium
                                                            text-[16px] text-secondary"
                                                        >
                                                            {subcat.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))
                            ) : (null)
                        }
                    </div>
                    <button
                        className="p-2 absolute top-7 right-[2em] lg:hidden"
                        onClick={() => setFilterOpen(false)}
                    >
                        <svg
                            viewBox='0 0 24 24'
                            fill="#BDBDBD"
                            className="w-7 h-7"
                        ><use xlinkHref='#close' /></svg>
                    </button>
                </div>
                <div className="flex flex-col gap-10 mt-10 lg:mt-0">
                    <SortMenu
                        title={lang?.['Категории']}
                        filterOpen={filterOpen}
                        setFilterOpen={setFilterOpen}
                    />
                    {
                        productsList ? (
                            <>
                                {
                                    productsList.length > 0 ? (
                                        <div className="flex flex-col gap-10">
                                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                                                {
                                                    productsList.map((item, index) => (
                                                        <ProductTab
                                                            index={index}
                                                            key={item.id}
                                                            product={item}
                                                            setProductId={setProductId}
                                                            productId={productId}
                                                            arrLength={20}
                                                        />
                                                    ))
                                                }
                                            </div>
                                            <PageButtons data={products} page={page} setPage={setPage} />
                                        </div>
                                    ) : (<div>Ничего не найдено</div>)
                                }
                            </>
                        ) : (
                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                                {[...Array(20).keys()].map(item => (
                                    <div key={item} className="overflow-hidden rounded-[24px]"><Skeleton height={350} /></div>
                                ))}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default memo(Brands);