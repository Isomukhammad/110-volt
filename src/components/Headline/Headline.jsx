import { useState } from 'react';
import Image from 'next/image';

import data from '../../data.json';

import styles from './Headline.module.scss';
import Slider from '../Slider/Slider';

const Headline = () => {
    const { slider } = data;
    const [image, setImage] = useState(2);
    const imageName = `url("/images/image ${image}.png")`

    return (
        <>
            <div className={styles.headline}>
                <div className={styles.slider}>
                    <Slider />
                </div>
                <div className={styles.sideImg}>
                    <Image src={'/images/image 3.png'} alt="" width="0" height="0" sizes="100vw" placeholder="blurDataURL" />
                </div>
            </div>
        </>
    )
}

export default Headline;