import Link from 'next/link';
import SignupForm from '../../components/SignupForm/SignupForm';
import HeadInfo from '../../utils/HeadInfo';

import styles from './signup.module.scss';

const SignUp = () => {
    return (
        <>
            <HeadInfo title="Регистрация" />
            <div className={styles.container}>
                <div className={styles.signIn}>
                    <h2>Регистрация</h2>
                    <SignupForm />
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

export default SignUp;