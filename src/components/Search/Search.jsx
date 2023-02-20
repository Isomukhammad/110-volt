import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { useSort } from "../../context/sortContext";
import { setQuery, useParams } from '../../hooks/useParams';
import { useLang } from '../../hooks/useLang';
import fetcher from "../../utils/fetcher";
import HeadInfo from "../../utils/headInfo";
import SortMenu from "../Category/SortMenu";
import PageButtons from "../PageButtons/PageButtons";
import PagePath from "../PagePath/PagePath";
import ProductTab from "../ProductTab/ProductTab";

const Search = () => {
    const lang = useLang();
    const router = useRouter();
    const [productId, setProductId] = useState(null);
    const [value, setValue] = useState('');
    const [formError, setFormError] = useState(null);
    const { view, sortBy, setSortBy } = useSort();
    const { setQuery } = useParams();
    const [filterOpen, setFilterOpen] = useState(false)

    const url = useMemo(() => {
        return `/products?search=${router.query.value}&page=${router.query.page || 1
            }&order_by=${sortBy.by}&order_direction=${sortBy.direction}${router.query.category_id && router.query.category_id != 'all'
                ? `&category_id=${router.query.category_id}`
                : ''
            }&quantity=${router.query.quantity || 20}`
    }, [
        router.query.value,
        router.query.page,
        router.query.category_id,
        router.query.quantity,
        sortBy,
    ])

    const { data: products, isValidating, mutate } = useSWR(router.query.value ? url : null, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    useEffect(() => {
        if (router.query.value) {
            setValue(router.query.value);
        }
    }, [router.query.value])

    const handleSearch = (e) => {
        e.preventDefault();
        setSortBy({ by: '', direction: '' })
        setQuery({ key: 'value', value: value })
    }

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
            <HeadInfo title="Поиск" />
            <div>
                <PagePath
                    paths={[
                        {
                            "url": "",
                            "name": "Поиск"
                        }
                    ]}
                />
                <h1 className="mt-6 lg:mt-10 text-[24px] lg:text-[32px] font-bold">Поиск</h1>
                <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[16%_81%;] mt-5 mb-10">
                    <form onSubmit={handleSearch} className="flex flex-row items-center h-10 w-full">
                        <input
                            type="text"
                            onChange={handleChange}
                            className="rounded-tl-[12px] rounded-bl-[12px] border-1 border-gray5 w-full py-[7px] focus:ring-0 focus:border-gray-400" placeholder={`${lang?.['Я ищу']}...`}
                            value={value}
                        />
                        <button type="sybmit" className="h-full border-accent border-l-0 bg-accent w-10 flex flex-row items-center justify-center rounded-tr-[12px] rounded-br-[12px]">
                            <svg viewBox="0 0 24 24" className="stroke-white fill-none w-6 h-6 bg-accent">
                                <use xlinkHref="#search" />
                            </svg>
                        </button>
                    </form>
                    {
                        router.query.value ? (
                            <div>
                                <div className="mb-10">
                                    <SortMenu products={products} productsLoading={isValidating} setFilterOpen={setFilterOpen} />
                                </div>
                                {
                                    products ? (
                                        <>
                                            <div className='grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3'>
                                                {
                                                    products?.data.map((info, index) => (
                                                        <ProductTab
                                                            index={index}
                                                            key={info.id}
                                                            product={info}
                                                            setProductId={setProductId}
                                                            productId={productId}
                                                            arrLength={20}
                                                        />
                                                    ))
                                                }
                                            </div>
                                            <PageButtons data={products} search={value} />
                                        </>
                                    ) : null
                                }
                            </div>
                        ) : (
                            <div className="rounded-[8px] mt-4 py-3 px-5 bg-[#ff000050] h-fit rounded-4 font-semibold">Поле поиска пустое...</div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Search;