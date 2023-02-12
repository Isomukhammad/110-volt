import PasswordEdit from './PasswordEdit';
import PersonalEdit from './PersonalEdit';

import styles from './ProfileForm.module.scss';

const ProfileForm = () => {
    return (
        <div className={styles.container}>
            <h3>Личные данные</h3>
            <PersonalEdit />
            <PasswordEdit />
        </div>
    )
}

export default ProfileForm;