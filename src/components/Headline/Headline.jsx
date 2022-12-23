import { useState } from 'react';
import Image from 'next/image';

import data from '../../data.json';

import styles from './Headline.module.scss';

const Headline = () => {
    const [image, setImage] = useState(2);

    return (
        <div className={styles.headline}>
            <div className={styles.sliders}>
                <Image src={`/images/image ${image}.png`} alt="" width={1196} height={350} className={styles.mainImg} />
                <div className={styles.slider}>
                    {
                        data.images.map(img => (
                            <Image key={img.id} src={img.img} alt="" width={253} height={75} onClick={() => setImage(img.img - id)} />
                        ))
                    }
                    {
                        data.images.map(img => (
                            <Image key={img.id} src={img.img} alt="" width={253} height={75} onClick={() => setImage(img.img - id)} />
                        ))
                    }
                    {
                        data.images.map(img => (
                            <Image key={img.id} src={img.img} alt="" width={253} height={75} onClick={() => setImage(img.img - id)} />
                        ))
                    }
                    {
                        data.images.map(img => (
                            <Image key={img.id} src={img.img} alt="" width={253} height={75} onClick={() => setImage(img.img - id)} />
                        ))
                    }
                </div>
            </div>
            <Image src={'/images/image 3.png'} alt="" width={388} height={437} />
        </div>
    )
}

export default Headline;