import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { useSort } from "../../context/sortContext";
import { useLang } from "../../hooks/useLang";
import fetcher from "../../utils/fetcher";

const Brands = ({ brand, tree }) => {
    const router = useRouter();
    const lang = useLang();
    const { setIsPopular, isPopular, sortBy, setSortBy } = useSort();
    const [filterOpen, setFilterOpen] = useState(false);

    const url = useMemo(() => {
        return `/products?page=${router.query.page || 1}&order_by=${sortBy.by}&order_direction=${sortBy.direction}&quantity=${router.query.quantity || 20}&brands[]=${brand.id}`
    }, [
        router.query.page,
        router.query.quantity,
        sortBy,
        brand
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

    return (
        <div className="Brands relative">
            <button onClick={() => setFilterOpen(true)}>Open</button>
            <h1 className="mt-10 text-[24px] font-bold lg:text-[32px]">{brand?.name}</h1>
            <div className="lg:grid lg:grid-cols-[16.6%_80%] lg:gap-[30px]">
                <div className={`fixed lg:relative flex flex-col gap-6 bg-white w-full h-full top-0 ${filterOpen ? 'left-0 lg:left-0' : 'left-[100%] lg:left-0'} z-[10] py-8 px-[2em] transition-all duration-300 lg:w-fit lg:h-fit lg:px-0`}>
                    <h3 className="text-[24px] font-semibold">{lang?.['Категории']}</h3>
                    <div className="flex flex-col gap-10">
                        {
                            tree ? (
                                tree.data.map((cat) => (
                                    <div key={cat.id}>
                                        <Link
                                            href={`/categories/${cat.id}-${cat.slug}/brand=${brand.id}-${brand.slug}`}
                                            className="text-[20px] font-semibold hover:text-accent transition duration-300"
                                        >{cat.name}</Link>

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
                <div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Brands;