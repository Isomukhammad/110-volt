import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';

import store, { wrapper } from '../store/store';

import MainLayout from '../layouts/Main';

import '../components/MenuCatalogue/MenuCatalogue.scss';

import '../styles/nprogress.css'
import '../styles/globals.scss';
import '../styles/colors.scss';
import '../styles/Slider.scss';

const App = ({ Component, ...rest }) => {
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

  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...props} />
      </MainLayout>
    </Provider>
  )
}

export default App;