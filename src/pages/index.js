import { nextAxios } from '../utils/axios';
import HeadInfo from '../utils/HeadInfo';
import Headline from '../components/Main/Headline';
import PopularCategories from '../components/Main/PopularCategories';
import Recommendations from '../components/Recommendations/Recommendations';
import CompanyDescription from '../components/Main/CompanyDescription';
import BrandCategories from '../components/Main/BrandCategories';
import Promotions from '../components/Main/Promotions';
import ReviewCategories from '../components/ReviewCategories/ReviewCategories';
import DiscountTabs from '../components/DiscountTabs/DiscountTabs';

import styles from '../styles/Home.module.scss';

const Home = ({ page }) => {
  return (
    <main className={styles.main}>
      <HeadInfo
        title={page.seo_title}
        description={page.meta_description}
        keywords={page.meta_keywords}
      />

      <Headline />
      <PopularCategories />
      <DiscountTabs />
      <Recommendations title="Хиты продаж" linkTitle="Все хиты" link="/products?is_bestseller=1&quantity=12" />
      <Recommendations title="Лучшие новинки" linkTitle="Все новинки" link="/products?is_new=1&quantity=12" />
      <Recommendations title="Успейте купить" link="/products?is_promotion=1&quantity=12" />
      <Promotions />
      {/* <ReviewCategories /> */}
      <BrandCategories />
      <CompanyDescription data={page} />
    </main>
  )
}

export const getServerSideProps = async ({ locale }) => {
  const page = await nextAxios
    .get(`pages/1`, {
      headers: { 'Accept-Language': locale },
    })
    .then((res) => res.data.data)
    .catch((err) => console.error(err))

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page,
    },
  }
}

export default Home;