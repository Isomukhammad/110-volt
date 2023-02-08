import HeadInfo from '../utils/HeadInfo'
import Headline from '../components/Main/Headline'
import PopularCategories from '../components/PopularCategories/PopularCategories'
import Recommendations from '../components/Recommendations/Recommendations';
import CompanyDescription from '../components/Main/CompanyDescription'
import BrandCategories from '../components/Main/BrandCategories'
import ReviewCategories from '../components/ReviewCategories/ReviewCategories'
import DiscountTabs from '../components/DiscountTabs/DiscountTabs';
import SalesTabs from '../components/SalesTabs/SalesTabs';

import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <HeadInfo />

      <Headline />
      <PopularCategories />
      <DiscountTabs />
      <Recommendations title="Хиты продаж" linkTitle="Все хиты" link="/products?is_bestseller=1&quantity=12" />
      <Recommendations title="Лучшие новинки" linkTitle="Все новинки" link="/products?is_new=1&quantity=12" />
      <Recommendations title="Успейте купить" link="/products?is_promotion=1&quantity=12" />
      <SalesTabs />
      <ReviewCategories />
      <BrandCategories />
      <CompanyDescription />
    </main>
  )
}