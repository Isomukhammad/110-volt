import { Html, Head, Main, NextScript } from 'next/document'
import config from '../../next.config';

export default function Document() {
  const currentLocale = config.i18n.defaultLocale;
  return (
    <Html lang={currentLocale}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.10.2/lottie.min.js" async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
