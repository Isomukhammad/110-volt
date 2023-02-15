import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import fetcher from '../../utils/fetcher';
import data from '../../data.json';
import { ScreenContext } from '../../context/screenContext';
import { useData } from '../../context/dataContext';

import styles from './Menu.module.scss';

const Menu = ({ menuOpen, setMenuOpen, searchFocus, setSearchFocus }) => {
    const { tree, treeValidating } = useData();
    const [btn, setBtn] = useState(null);
    const { isMobile, isTablet } = useContext(ScreenContext);
    const [showItems, setShowItems] = useState(true);
    const searchRef = useRef(null);

    useEffect(() => {
        if (isTablet || isMobile === true) {
            setShowItems(false);
        }

        if (searchFocus) {
            searchRef.current.focus();
        }
    }, [isTablet, isMobile, searchFocus])

    useEffect(() => {
        tree ? (
            setBtn(tree.data[0].id)
        ) : null
    }, [tree]);

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

    console.log(tree)

    if (!treeValidating) {
        return (
            <div
                className={`${styles.container} ${menuOpen ? styles.menuIsOpen : styles.menuIsClosed}`}
            >
                <div className={styles.menu} ref={wrapperRef}>
                    {
                        isTablet || isMobile ? (
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
                                            stroke="#828282"
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
                            tree.data.map((item) => (
                                <div
                                    key={item.id}
                                    className={styles.catalogueItem}
                                    onMouseOver={() => setBtn(item.id)}
                                    onClick={() => setShowItems(true)}
                                >
                                    <button
                                        className={item.id === btn ? styles.active : null}
                                    >
                                        <div dangerouslySetInnerHTML={{ __html: item.svg_icon }}></div>
                                        <p>{item.name}</p>
                                    </button>
                                    <svg
                                        viewBox='0 0 24 24'
                                        width={24}
                                        height={24}
                                        className={styles.itemIcon}
                                        fill="#828282"
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
                            {
                                tree.data.filter(item => item.id === btn).map(sub => (
                                    <>
                                        <h1>{sub.h1_name}</h1>
                                        <div className={styles.links}>
                                            {sub.children.map((item) => (
                                                <Link
                                                    href={`/categories/${item.id}-${item.slug}`}
                                                    key={item.id}
                                                    onClick={() => {
                                                        setMenuOpen(false);
                                                        setShowItems(false);
                                                    }}
                                                >
                                                    {item.h1_name}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                        <div className={styles.img}>
                            <div>
                                <Image src={'/images/Rectangle 15.png'} alt="" width={0} height={0} sizes="100vw" />
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
            </div >
        )
    }
}

export default Menu;