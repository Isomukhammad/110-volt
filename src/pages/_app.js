import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';

//context 
import AuthGuard, { AuthProvider } from '../context/auth';
import { CartProvider } from '../context/cart';
import { DataProvider } from '../context/dataContext';
import ScreenContext from '../context/screenContext';

//layout
import MainLayout from '../layouts/Layout/Main';

//styles
import '../styles/nprogress.css'
import '../styles/globals.scss';
import '../styles/colors.scss';
import '../styles/Slider.scss';
import '../styles/SortMenu.scss';
import '../styles/ProductImageSlider.scss';
import '../styles/PageButtons.scss';
import 'react-toastify/dist/ReactToastify.min.css';

import { WishProvider } from '../context/wish';

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => NProgress.start()
    const handleStop = () => NProgress.done()

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <WishProvider>
            <DataProvider>
              <ScreenContext>
                <MainLayout>
                  {
                    Component.requireAuth === true ? (
                      <AuthGuard>
                        <Component {...pageProps} />
                      </AuthGuard>
                    ) : (
                      <Component {...pageProps} />
                    )
                  }
                </MainLayout>
              </ScreenContext>
            </DataProvider>
          </WishProvider>
        </CartProvider>
      </AuthProvider>
    </>
  )
}

export default App;