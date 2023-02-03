import Head from "next/head";

const HeadInfo = ({ title, description, keywords }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

HeadInfo.defaultProps = {
    title: "110-volt.uz",
    description: "Купить бытовую технику",
    keywords: ""
}

export default HeadInfo;