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
            <Slider images={slider} />
            <div className={styles.headline}>
                <div className={styles.sliders}>
                    {/* <Image src={`/images/image ${image}.png`} alt="" width="0" height="0" sizes="100vw" placeholder="blurDataURL" className={styles.mainImg} /> */}
                    <div style={{ backgroundImage: { imageName } }} className={styles.mainImg} ></div>
                    <div className={styles.slider}>
                        {
                            data.images.map(img => (
                                <div key={img.id} className={styles.sliderImg}>
                                    <Image src={img.img} alt="" width="0" height="0" sizes="100vw" placeholder="blurDataURL" onClick={() => setImage(img.id)} />
                                </div>

                            ))
                        }
                        {
                            data.images.map(img => (
                                // <Image key={img.id} src={img.img} alt="" width="0" height="0" sizes="100vw" placeholder="blurDataURL" onClick={() => setImage(img.img - id)} />
                                <div key={img.id} style={{ backgroundImage: { imageName } }} ></div>
                            ))
                        }
                        {
                            data.images.map(img => (
                                // <Image key={img.id} src={img.img} alt="" width="0" height="0" sizes="100vw" placeholder="blurDataURL" onClick={() => setImage(img.img - id)} />
                                <div key={img.id} style={{ backgroundImage: { imageName } }} ></div>
                            ))
                        }
                        {
                            data.images.map(img => (
                                // <Image key={img.id} src={img.img} alt="" width="0" height="0" sizes="100vw" placeholder="blurDataURL" onClick={() => setImage(img.img - id)} />
                                <div key={img.id} style={{ backgroundImage: { imageName } }} ></div>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.sideImg}>
                    <Image src={'/images/image 3.png'} alt="" width="0" height="0" sizes="100vw" placeholder="blurDataURL" />
                </div>
            </div>
        </>
    )
}

export default Headline;