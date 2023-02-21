import { useEffect, useState } from 'react';
import { useLang } from '../../hooks/useLang';
import PasswordEdit from './PasswordEdit';
import PersonalEdit from './PersonalEdit';

import styles from './ProfileForm.module.scss';

const ProfileForm = () => {
    const lang = useLang();
    return (
        <>
            <div className={`${styles.container} relative`}>
                <h3>{lang?.['Личные данные']}</h3>
                <PersonalEdit />
                <PasswordEdit />
            </div>
        </>
    )
}

export default ProfileForm;