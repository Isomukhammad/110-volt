import Link from 'next/link';
import { useLang } from '../../hooks/useLang';
import styles from './PagePath.module.scss';

const PagePath = ({ paths }) => {
    const lang = useLang();
    return (
        <nav className={styles.container}>
            <Link href="/">{lang?.['Главная']}</Link>
            {
                paths?.map((item) => (
                    <div key={item.name}>
                        {
                            item.url ? (
                                <Link
                                    href={`/${item.url}`}
                                >
                                    &mdash; {item.name}
                                </Link>
                            ) : (
                                <div className='font-medium'>
                                    &mdash; {item.name}
                                </div>
                            )
                        }
                    </div>
                ))
            }
        </nav>
    )
}

export default PagePath;