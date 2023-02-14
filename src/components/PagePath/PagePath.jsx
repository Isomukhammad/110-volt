import Link from 'next/link';
import { useLang } from '../../hooks/useLang';
import styles from './PagePath.module.scss';

const PagePath = ({ paths }) => {
    const lang = useLang();
    return (
        <nav className={styles.container}>
            {
                paths?.map((item, index) => (
                    <div key={index}>
                        {
                            index === 0 ? (
                                <Link href="/">{lang?.['Главная']}</Link>
                            ) : (
                                item.url ? (
                                    <Link
                                        href={`/${item.url}`}
                                    >
                                        &mdash; {item.name}
                                    </Link>
                                ) : (
                                    <div>
                                        &mdash; {item.name}
                                    </div>
                                )
                            )
                        }
                    </div>
                ))
            }
        </nav>
    )
}

export default PagePath;