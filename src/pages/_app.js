import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';

import MainLayout from '../layouts/Main';

import '../components/MenuCatalogue/MenuCatalogue.scss';

import '../styles/nprogress.css'
import '../styles/globals.scss';
import '../styles/colors.scss';

export default function App({ Component, pageProps }) {
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
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  )
}
