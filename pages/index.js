import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Headline from '../components/Headline/Headline'
import PopularCategories from '../components/PopularCategories/PopularCategories'
import HeadInfo from '../utils/HeadInfo'
import Recommendations from '../components/Recommendations/Recommendations';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.main}>
      <HeadInfo />

      <Headline />
      <PopularCategories />
      <Recommendations title="Хиты продаж" link="/" linkTitle="Все хиты" />
      <Recommendations title="Лучшие новинки" link="/" linkTitle="Все новинки" />
      <Recommendations title="Успейте купить" />
    </div>
  )
}
