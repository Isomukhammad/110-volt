import { useState } from 'react';
import styles from './SortMenu.module.scss';

const SortMenu = () => {
    const [choice, setChoice] = useState('popularity');
    const [isAscending, setIsAscending] = useState(true);

    return (
        <div className={styles.container}>
            <p className={styles.title}>Сортировать по: </p>
            <ul className={styles.choices}>
                <li
                    onClick={() => setChoice('popularity')}
                    style={{ color: choice == 'popularity' ? '#7B54C9' : null }}
                >Популярности</li>
                <li
                    style={{ color: choice == 'new' ? '#7B54C9' : null }}
                    onClick={() => setChoice('new')}
                >Новинкам</li>
                <li onClick={() => setChoice('rating')}
                    style={{ color: choice == 'rating' ? '#7B54C9' : null }}
                >Рейтингу</li>
                <li
                    className={styles.price}
                    onClick={() => {
                        setChoice('price');
                        setIsAscending(!isAscending);
                    }}
                    style={{ color: choice == 'price' ? '#7B54C9' : null }}
                >
                    <p>Цене</p>
                    <svg
                        viewBox="0 0 16 17"
                        width="16"
                        height="17"
                        stroke="#242424"
                        fill="none"
                        style={{
                            stroke: choice == 'price' ? '#7B54C9' : null,
                            transform: isAscending ? 'rotate(90deg)' : null
                        }}
                    >
                        <use xlinkHref='#arrow-right'></use>
                    </svg>
                </li>
                <li
                    onClick={() => setChoice('sales')}
                    style={{ color: choice == 'sales' ? '#7B54C9' : null }}
                >Скидкам</li>
            </ul>
        </div >
    )
}

export default SortMenu;