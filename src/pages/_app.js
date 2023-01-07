import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';

//context 
import ScreenContext from '../context/screenContext';

//layout
import MainLayout from '../layouts/Main';

//styles
import '../styles/nprogress.css'
import '../styles/globals.scss';
import '../styles/colors.scss';
import '../styles/Slider.scss';
import '../styles/SortMenu.scss';
import '../styles/ProductImageSlider.scss'

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
      <ScreenContext>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ScreenContext>
    </>
  )
}

export default App;