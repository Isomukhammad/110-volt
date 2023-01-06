import { useContext } from "react";
import Link from "next/link";

import { ScreenSize } from "../../context/screenContext";

import Button from "../Button/Button";

import styles from './PopUp.module.scss'

const PopUp = ({ result, setPopUp }) => {
    const { isMobile } = useContext(ScreenSize)
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {
                    result === 'success' ? (
                        <>
                            <div className={styles.image}></div>
                            <div className={styles.description}>
                                <h4>Ура, вы это сделали!</h4>
                                <p>Ваш заказ успешно оформлен</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.image}></div>
                            <div className={styles.description}>
                                <h4>Упс, кажется что-то пошло не так</h4>
                                <p>Наши модераторы свяжутся с вами</p>
                            </div>
                        </>
                    )
                }
                <Link href='/' onClick={() => setPopUp(false)}>
                    <Button>
                        {
                            isMobile ? (<>На главную</>) : (<>Вернуться на главную</>)
                        }
                    </Button>
                </Link>
                <svg
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    stroke="#BDBDBD"
                    onClick={() => setPopUp(false)}
                >
                    <use xlinkHref="#close"></use>
                </svg>
            </div>
        </div >
    );
}

export default PopUp;