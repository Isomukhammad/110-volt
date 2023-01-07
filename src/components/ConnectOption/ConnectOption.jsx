import { useEffect, useRef, useState } from 'react';
import styles from './ConnectOption.module.scss'

const ConnectOption = () => {
    const [open, setOpen] = useState(false);
    const [option, setOption] = useState("Напишите мне")

    const onChangeHandler = (e) => {
        setOption(e.target.innerHTML)
    }
    const onClickHandler = () => setOpen(!open);

    const useOutsideAlerter = (ref) => {
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpen(false);
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <div
            className={`${styles.container} ${open ? styles.open : ''}`}
            onClick={onClickHandler}
            ref={wrapperRef}
        >
            <div className={styles.chosen}>
                <p>{option}</p>
                <svg
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    fill="#BDBDBD"
                >
                    <use xlinkHref='#arrow-ios-forward'></use>
                </svg>
            </div>
            <div className={styles.menu}>
                <div
                    value="sms"
                    onClick={e => onChangeHandler(e)}>Напишите мне</div>
                <div
                    value="call"
                    onClick={e => onChangeHandler(e)}>Позвоните мне</div>
            </div>
        </div>

    );
}

export default ConnectOption;