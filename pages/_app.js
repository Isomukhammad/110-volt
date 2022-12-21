import BottomMenu from '../components/bottom-menu/bottom-menu.component'
import Header from '../components/header/header.component'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <BottomMenu />
      <Component {...pageProps} />
    </>
  )
}
