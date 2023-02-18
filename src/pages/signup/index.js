import Link from 'next/link';
import { useState } from 'react';
import SignUp from '../../components/SignUp/SignUp';
import { useLang } from '../../hooks/useLang';
import HeadInfo from '../../utils/headInfo';

import styles from './SignUp.module.scss';

const SignUpPage = () => {
    const lang = useLang();
    return (
        <>
            <HeadInfo title={lang?.['Регистрация']} />
            <div className={styles.container}>
                <div className={styles.signUn}>
                    <h2 className='text-[24px] font-semibold'>{lang?.['Регистрация']}</h2>
                    <SignUp />
                    <p className={styles.account}>{lang?.['Уже есть аккаунт?']} <Link href="/signin"><button className='ml-1 text-accent hover:text-accentDark'>{lang?.['Войти']}</button></Link></p>
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

export default SignUpPage;