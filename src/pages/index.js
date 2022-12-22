import Headline from '../components/Headline/Headline'
import PopularCategories from '../components/PopularCategories/PopularCategories'
import HeadInfo from '../utils/HeadInfo'
import Recommendations from '../components/Recommendations/Recommendations';
import CompanyDescription from '../components/CompanyDescription/CompanyDescription'
import BrandCategories from '../components/BrandCategories/BrandCategories'
import ReviewCategories from '../components/ReviewCategories/ReviewCategories'

import styles from '../styles/Home.module.css';
import DiscountTabs from '../components/DiscountTabs/DiscountTabs';
import SalesTabs from '../components/SalesTabs/SalesTabs';

export default function Home() {
  return (
    <main className={styles.main}>
      <HeadInfo />

      <Headline />
      <PopularCategories />
      <DiscountTabs />
      <Recommendations title="Хиты продаж" link="/" linkTitle="Все хиты" />
      <Recommendations title="Лучшие новинки" link="/" linkTitle="Все новинки" />
      <Recommendations title="Успейте купить" />
      <SalesTabs />
      <ReviewCategories />
      <BrandCategories />
      <CompanyDescription />
    </main>
  )
}
