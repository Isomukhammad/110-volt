import Link from 'next/link';
import SignIn from '../../components/SignIn/SignIn';
import { useLang } from '../../hooks/useLang';

import HeadInfo from '../../utils/HeadInfo'

import styles from './SignIn.module.scss'

const SignInPage = () => {
    const lang = useLang();
    return (
        <>
            <HeadInfo title={lang?.['Авторизация']} />
            <div className={styles.container}>
                <div className={styles.signIn}>
                    <h2 className='text-[24px] font-semibold'>{lang?.['Войти']}</h2>
                    <SignIn />
                    <p className={styles.account}>
                        {lang?.['Нет аккаунта?']}
                        <Link href="/signup">
                            <button className='ml-1 text-accent hover:text-accentDark'>{lang?.['Зарегистрироваться']}</button>
                        </Link>
                    </p>
                    <div className={styles.conditions}>
                        <svg
                            viewBox='0 0 16 13'
                            width={16}
                            height={13}
                            fill="none"
                            stroke="#7B54C9"
                        >
                            <use xlinkHref='#tick-logo'></use>
                        </svg>
                        <p>{lang?.['Ознакомлен и согласен с условиями Правил пользования торговой площадкой и Правилами возврата']}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignInPage;