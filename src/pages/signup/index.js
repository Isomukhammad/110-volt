import Link from 'next/link';
import { useState } from 'react';
import MsgCodeForm from '../../components/SignUp/MsgCodeForm';
import SignUp from '../../components/SignUp/SignUp';
import HeadInfo from '../../utils/HeadInfo';

import styles from './SignUp.module.scss';

const SignUpPage = () => {
    return (
        <>
            <HeadInfo title="Регистрация" />
            <div className={styles.container}>
                <div className={styles.signUn}>
                    <h2 className='text-[24px] font-semibold'>Регистрация</h2>
                    <SignUp />
                    <p className={styles.account}>Уже есть аккаунт? <Link href="/signin">Войти</Link></p>
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
                        <p>Ознакомлен и согласен с условиями Правил пользования торговой площадкой и Правилами возврата</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpPage;