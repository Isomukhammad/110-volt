import MainLayout from '../layouts/Main';

import '../styles/globals.css';
import '../components/MenuCatalogue/MenuCatalogue.scss';

export default function App({ Component, pageProps }) {
  return (
    <>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  )
}
