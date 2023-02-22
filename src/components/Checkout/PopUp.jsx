import { useContext } from "react";
import Link from "next/link";

import { ScreenContext } from "../../context/screenContext";

import Button from "../Button/Button";

import styles from './PopUp.module.scss'
import ImageComponent from "../ImageComponent/ImageComponent";
import { useLang } from "../../hooks/useLang";
import { useRouter } from "next/router";

const PopUp = ({ result, setPopUp }) => {
    const lang = useLang();
    const router = useRouter();
    const { isMobile } = useContext(ScreenContext)

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {
                    result === 'success' ? (
                        <>
                            <div className={styles.image}>
                                <ImageComponent
                                    src={'/gifs/animation_640_lefqb16y.gif'}
                                />
                            </div>
                            <div className={styles.description}>
                                <h4>{lang?.['Ура, Ваша заявка отправлена!']}</h4>
                                <p>{lang?.['Наши операторы с вами свяжутся как только ваша заявка пройдет модерацию.']}</p>
                            </div>
                            <Button onClick={() => {
                                setPopUp(false),
                                    router.push('/profile?section=orders')
                            }}>
                                {lang?.['Детали заказа']}
                            </Button>
                        </>
                    ) : (
                        <>
                            <div className={styles.image}>
                                <ImageComponent
                                    src={"/gifs/animation_640_lefpjz8v.gif"}
                                />
                            </div>
                            <div className={styles.description}>
                                <h4>{lang?.['Что-то пошло не так ☹️']}</h4>
                                <p>{lang?.['Наши модераторы свяжутся с вами']}</p>
                            </div>
                            <Button onClick={() => {
                                setPopUp(false),
                                    router.push('/')
                            }}>
                                {lang?.['Вернуться на главную']}
                            </Button>
                        </>
                    )
                }
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