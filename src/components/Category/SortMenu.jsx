import { useContext, useState } from 'react';
import ReactDropdown from 'react-dropdown';
import { ScreenContext } from '../../context/screenContext';
import { useSort } from '../../context/sort'
import { useLang } from '../../hooks/useLang';

import styles from './SortMenu.module.scss';

const SortMenu = ({ setFilterOpen }) => {
    const lang = useLang();
    const [listView, setListView] = useState(false);
    const { setIsPopular, isPopular, sortBy, setSortBy } = useSort();
    const { isMobile } = useContext(ScreenContext);

    const options = [
        {
            value: 'is_popular', label: lang?.['Популярности']
        },
        {
            value: 'is_new', label: lang?.['Новинкам']
        },
        {
            value: 'rating', label: lang?.['Рейтингу']
        },
        {
            value: 'price', label: `${lang?.['Цене']}: ${lang?.['по возрастанию']}`
        },

        {
            value: 'sales', label: lang?.['Скидкам']
        }
    ];
    const defaultOption = options[0];
    const [choice, setChoice] = useState('popularity');
    const [isAscending, setIsAscending] = useState(true);

    const handleViewChange = (boolean) => {
        if (isMobile) {
            setListView(!listView)
        } else {
            setListView(boolean)
        }
    }

    return (
        <div className={styles.container}>
            <ReactDropdown
                onChange={(e) => { set(e.value) }}
                options={options}
                value={defaultOption}
                placeholder="Select an option"
                arrowClosed={
                    <svg
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        fill="#BDBDBD"
                    >
                        <use xlinkHref='#arrow-ios-forward'></use>
                    </svg>
                }
                arrowOpen={
                    <svg
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        fill="#BDBDBD"
                    >
                        <use xlinkHref='#arrow-ios-backward'></use>
                    </svg>
                }
                className={styles.sortDropdown}
            />
            <div className={styles.sortBy}>
                <p className={styles.title}>{lang?.['Сортировать по']}: </p>
                <ul className={styles.choices}>
                    <li
                        onClick={() => {
                            setChoice('popularity');
                            setSortBy({ "by": "", "direction": "" });
                            setIsPopular(true);
                        }}
                        style={{ color: isPopular ? '#7B54C9' : null }}
                    >{lang?.['Популярности']}</li>
                    <li
                        style={{ color: sortBy.by == 'created_at' ? '#7B54C9' : null }}
                        onClick={() => {
                            setIsPopular(false);
                            setSortBy({ "by": "created_at", "direaction": "desc" })
                        }}
                    >{lang?.['Новинкам']}</li>
                    <li
                        onClick={() => {
                            setChoice('rating')
                            setIsPopular(false);
                            setSortBy({ "by": "rating", "direction": "asc" })
                        }}
                        style={{ color: sortBy.by == 'rating' ? '#7B54C9' : null }}
                    >{lang?.['Рейтингу']}</li>
                    <li
                        className={styles.price}
                        onClick={() => {
                            setChoice('price');
                            setIsAscending(!isAscending);
                            setIsPopular(false)
                            if (isAscending) {
                                setSortBy({ "by": "price", "direction": "asc" })
                            } else {
                                setSortBy({ "by": "price", "direction": "desc" })
                            }
                        }}
                        style={{ color: sortBy.by == 'price' ? '#7B54C9' : null }}
                    >
                        <p>{lang?.['Цене']}</p>
                        <svg
                            viewBox="0 0 16 17"
                            width="16"
                            height="17"
                            stroke="#242424"
                            fill="none"
                            style={{
                                stroke: sortBy.by == 'price' ? '#7B54C9' : '#242424',
                            }}
                            className={`${sortBy.by == 'price' && sortBy.direction == 'desc' ? styles.ascend : ''}`}
                        >
                            <use xlinkHref='#arrow-right'></use>
                        </svg>
                    </li>
                    <li
                        onClick={() => {
                            setChoice('sales');
                            setSortBy({ "by": "", "direction": "" });
                            setIsPopular(false);
                        }}
                        style={{ color: choice == 'sales' ? '#7B54C9' : null }}
                    >{lang?.['Скидкам']}</li>
                </ul>
            </div>
            <button className={styles.filterButton} onClick={() => setFilterOpen(true)}>
                <svg
                    viewBox='0 0 24 24'
                    width={24}
                    height={24}
                >
                    <use xlinkHref='#filter'></use>
                </svg>
                <p>Фильтры</p>
            </button>
            <div className={styles.viewType}>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{
                        stroke: listView === true ? "#7B54C9" : "#BDBDBD",
                        display: !listView && isMobile ? "none" : ''
                    }}
                    onClick={() => handleViewChange(true)}
                >
                    <use xlinkHref='#row-view-logo'></use>
                </svg>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7B54C9"
                    style={{
                        stroke: !listView === true ? "#7B54C9" : "#BDBDBD",
                        display: listView && isMobile ? "none" : ''
                    }}
                    onClick={() => handleViewChange(false)}
                >
                    <use xlinkHref='#column-view-logo'></use>
                </svg>
            </div>
        </div >
    )
}

export default SortMenu;