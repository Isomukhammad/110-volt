import Head from "next/head";

const HeadInfo = ({ title = '110volt.uz', description = '', keywords = '' }) => (
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
)

export default HeadInfo;