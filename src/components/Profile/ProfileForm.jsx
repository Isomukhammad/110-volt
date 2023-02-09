import PasswordEdit from './PasswordEdit';
import PersonalEdit from './PersonalEdit';

import styles from './ProfileForm.module.scss';

const ProfileForm = () => {
    return (
        <div className={styles.container}>
            <h3>Личные данные</h3>
            <PersonalEdit />
            <PasswordEdit />
            <button className='bg-red-600 py-[12px] text-[16px] mt-10 text-white w-full max-w-[360px] rounded-[16px] font-semibold hover:bg-red-700 transition duration-300'>Удалить аккаунт</button>
        </div>
    )
}

export default ProfileForm;