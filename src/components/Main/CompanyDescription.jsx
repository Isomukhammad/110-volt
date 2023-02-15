import { useState } from 'react';
import { useLang } from '../../hooks/useLang';
import styles from './CompanyDescription.module.scss';

const CompanyDescription = ({ data }) => {
    const lang = useLang();
    const [isHidden, setIsHidden] = useState(true);
    return (
        <article className={styles.container}>
            <h1 className='font-semibold'>{lang?.['110volt Family - это экономия на доставке, взаимная поддержка и полная конфиденциальность. ']}</h1>

            <div className={isHidden ? `${styles.hide}` : null} dangerouslySetInnerHTML={{ __html: data.body }} />
            <div>
                <button onClick={() => { setIsHidden(!isHidden) }}>
                    {
                        isHidden ? lang?.['Читать далее'] : 'Скрыть'
                    }
                </button>
            </div>
        </article>
    )
}

export default CompanyDescription;