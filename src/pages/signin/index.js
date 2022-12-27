import Link from 'next/link';
import SigninForm from '../../components/SigninForm/SigninForm';

import HeadInfo from '../../utils/HeadInfo'

import styles from './signIn.module.scss'

const SignIn = () => {
    return (
        <>
            <HeadInfo title="Авторизация" />
            <div className={styles.container}>
                <div className={styles.signIn}>
                    <h2>Войти</h2>
                    <SigninForm />
                    <p className={styles.account}>Нет аккаунта? <Link href="/signup">Зарегестрироваться</Link></p>
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

export default SignIn;