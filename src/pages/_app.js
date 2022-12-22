import MainLayout from '../layouts/Main';

import '../components/MenuCatalogue/MenuCatalogue.scss';
import '../components/DiscountTabs/DiscountTabs.scss'

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  )
}
