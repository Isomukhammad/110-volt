/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'uz',
    locales: ['uz', 'ru'],
    localeDetection: false
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shop.inweb.uz',
      },
    ],
  },
  env: {
    API: 'https://shop.inweb.uz/api/v2',
  },
}
