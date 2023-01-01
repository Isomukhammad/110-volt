import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import news from '../../news.json';

import PagePath from '../../components/PagePath/PagePath';
import HeadInfo from '../../utils/HeadInfo';
import ImageComponent from '../../components/ImageComponent/ImageComponent';
import NewSlider from '../../components/NewSlider/NewSlider';

import styles from './Article.module.scss'

const NewsBlog = () => {
    const [data, setData] = useState();
    const { query } = useRouter();

    useEffect(() => {
        const item = news.find((item) => {
            return item.id == query.article;
        })
        setData(item);
        console.log(query);
    }, [query]);

    return (
        <>
            <HeadInfo title="Новости" />
            <PagePath
                paths={[
                    {
                        "url": "/",
                        "name": "Главная"
                    },
                    {
                        "url": "",
                        "name": `Новости`
                    }
                ]}
            />
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>{data?.title}</h1>
                    <ImageComponent
                        src={data?.image}
                        alt="Image of news"
                    />
                    <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{ __html: data?.body }}
                    />
                </div>
                <NewSlider data={news} />
            </div>
        </>
    )
}

export default NewsBlog;