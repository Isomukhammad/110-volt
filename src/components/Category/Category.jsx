import { useRouter } from 'next/router';
import Link from 'next/link';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import ProductTab from '../ProductTab/ProductTab';
import PageButtons from "../../components/PageButtons/PageButtons";
import { useParams } from '../../hooks/useParams';
import { ScreenContext } from '../../context/screenContext';
import { useSort } from '../../context/sortContext';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import PagePath from '../PagePath/PagePath';
import styles from './Category.module.scss';
import FilterMenu from './FilterMenu';
import SortMenu from './SortMenu';
import HeadInfo from '../../utils/headInfo';
import { useLang } from '../../hooks/useLang';

const Category = ({
   attributes,
   prices,
   brands,
   category,
   dataLoading,
}) => {
   const router = useRouter();
   const lang = useLang();
   const [filterOpen, setFilterOpen] = useState(false)
   const [productId, setProductId] = useState(null);
   const { quantity, view, sortBy, isPopular, setIsPopular } = useSort();
   const { findParams, updateParams } = useParams()
   // const arrLength = info.length - 1;
   const { isMobile, isTablet } = useContext(ScreenContext)
   const [page, setPage] = useState(null);
   const [productsList, setProductsList] = useState(null);

   const url = useMemo(() => {
      const brandParams = findParams('brand')
         ? findParams('brand')
            .split('=')[1]
            .split(',')
            .map((brand) => `&brands[]=${brand.split('-')[0]}`)
            .join('')
         : ''

      const attributeParams = router.query.category
         .map((query) => {
            if (query.split('=')[0].includes('attribute')) {
               const keys = query.split('=')[0].split('-')
               const values = query.split('=')[1].split(',')
               return values
                  .map(
                     (value) =>
                        `&attributes[${keys[keys.length - 1]}][]=${value.split('-')[0]}`
                  )
                  .join('')
            } else {
               return ''
            }
         })
         .join('')

      const priceParams = findParams('price')
         ? findParams('price')
            .split('=')[1]
            .split('-')
            .map((price, i) => `&price_${i == 0 ? 'from' : 'to'}=${price}`)
         : ''
      return `/products?category_id=${category.id
         }${brandParams}${attributeParams}${priceParams}${isPopular ? 'is_new' : ''}&order_by=${sortBy.by
         }&order_direction=${sortBy.direction}&page=${!page ? router.query.page : page}&quantity=${router.query.quantity || 20}`
   }, [
      isPopular,
      category.id,
      sortBy,
      page,
      router.query.page,
      router.query.category,
      router.query.quantity,
      findParams
   ])

   const { data: products, isValidating } = useSWR([url, router.locale], (url) => fetcher(url, {
      headers: { 'Accept-Language': router.locale }
   }), {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
   })

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
      <>
         <HeadInfo
            title={category?.seo_title}
            description={category?.meta_description}
            keywords={category?.meta_keywords}
         />
         <div className={styles.container}>
            <PagePath
               paths={[
                  {
                     "name": category?.name,
                     "url": ""
                  }
               ]}
            />
            <div className={styles}>
               <div className={styles.title}>
                  <h1 className='font-bold text-[24px] lg:text-[32px] leading-8'>{category?.name}</h1>
                  {lang ? (<p>{(lang?.['{{number}} товаров']).replace('{{number}}', products?.meta.total)}</p>) : null}
               </div>
               <div className={styles.content}>
                  <FilterMenu
                     filterOpen={filterOpen}
                     setFilterOpen={setFilterOpen}
                     attributes={attributes}
                     prices={prices}
                     brands={brands}
                     category={category}
                     loading={dataLoading}
                  />
                  <div className={styles.productsColumn}>
                     <SortMenu title={lang?.['Фильтры']} products={products} productsLoading={isValidating} setFilterOpen={setFilterOpen} />
                     {
                        productsList ? (
                           <>
                              <div className={styles.products}>
                                 {
                                    productsList.map((info, index) => (
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
                              <PageButtons data={products} page={page} setPage={setPage} />
                           </>
                        ) : null
                     }
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default memo(Category);
