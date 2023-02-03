/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
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
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'uz'],
  }
}
