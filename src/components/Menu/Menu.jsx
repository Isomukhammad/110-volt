import { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import data from '../../data.json';
import { ScreenSize } from '../../context/screenContext';

import ImageComponent from '../ImageComponent/ImageComponent';

import styles from './Menu.module.scss';

const Menu = ({ menuOpen, setMenuOpen, searchFocus, setSearchFocus }) => {
    const [btn, setBtn] = useState(0);
    const { catalogues } = data;
    const { title, catalogue } = catalogues[btn];
    const { isTablet } = useContext(ScreenSize);
    const [showItems, setShowItems] = useState(true);
    const searchRef = useRef(null);

    useEffect(() => {
        if (isTablet === true) {
            setShowItems(false);
        }

        if (searchFocus) {
            console.log(searchFocus)
            searchRef.current.focus();
        }
    }, [isTablet, searchFocus])

    const useOutsideAlerter = (ref) => {
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    setMenuOpen(false);
                    setSearchFocus(false);
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

    const stopProp = (event) => {
        event.stopProagation();
    }

    return (
        <div
            className={`${styles.container} ${menuOpen ? styles.menuIsOpen : styles.menuIsClosed}`}
        >
            <div className={styles.menu} ref={wrapperRef}>
                {
                    isTablet ? (
                        <div className={styles.header}>
                            <div
                                onClick={() => {
                                    setMenuOpen(false);
                                    setShowItems(false);
                                }}
                                style={{ cursor: "pointer" }}
                            >
                                <svg
                                    viewBox='0 0 24 24'
                                    width={24}
                                    height={24}
                                    stroke="#828282"
                                    fill="#828282"
                                >
                                    <use xlinkHref='#close'></use>
                                </svg>
                            </div>
                            <div className={styles.search}>
                                <div className={styles.icon}>
                                    <svg
                                        viewBox='0 0 24 24'
                                        width={24}
                                        height={24}
                                        stroke="#242424"
                                        fill='none'
                                    >
                                        <use xlinkHref='#search'></use>
                                    </svg>
                                </div>
                                <input ref={searchRef} type="text" placeholder='Я ищу ...' />
                            </div>
                        </div>
                    ) : null
                }
                <div className={`${styles.menuCatalogue} ${showItems ? styles.showCategory : ''}`}>
                    {
                        catalogues.map((item) => (
                            <div
                                key={item.id}
                                className={styles.catalogueItem}
                                onMouseOver={() => setBtn(item.id)}
                                onClick={() => setShowItems(true)}
                            >
                                <button
                                    className={item.id === btn ? styles.active : null}
                                >
                                    <svg width={24} height={24} viewBox='0 0 24 24' fill='#828282' stroke="#828282"
                                    >
                                        <use xlinkHref={`#${item.logo}`}></use>
                                    </svg>
                                    <p>{item.title}</p>
                                </button>
                                <svg
                                    viewBox='0 0 24 24'
                                    width={24}
                                    height={24}
                                    className={styles.itemIcon}
                                >
                                    <use xlinkHref='#arrow-ios-forward'></use>
                                </svg>
                            </div>
                        ))
                    }
                </div>
                <div className={`${styles.catalogueItems} ${!showItems ? styles.showItems : ''}`}>
                    <div
                        className={styles.items}
                    >
                        <h1>{title}</h1>
                        <div className={styles.links}>
                            {
                                catalogue.map((item) => (
                                    <Link
                                        href={item.link}
                                        key={item.id}
                                        onClick={() => {
                                            setMenuOpen(false);
                                            setShowItems(false);
                                        }}
                                    >
                                        {item.name}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles.img}>
                        <div>
                            <ImageComponent src={'/images/Rectangle 15.png'} alt="" width={250} height={400} />
                        </div>
                        <p>Смартфоны</p>
                    </div>
                </div>
                <div
                    className={styles.close}
                    onClick={() => setMenuOpen(false)}
                >
                    <svg
                        viewBox='0 0 32 32'
                        width={32}
                        height={32}
                        stroke="white"
                        fill="white"
                    >
                        <use xlinkHref='#close'></use>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Menu;