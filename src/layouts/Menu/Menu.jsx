import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { useMedia } from '../../context/screenContext';
import { useData } from '../../context/dataContext';

import styles from './Menu.module.scss';
import { useRouter } from 'next/router';

const Menu = ({ menuOpen, setMenuOpen, searchFocus, setSearchFocus }) => {
    const router = useRouter();
    const { tree, treeValidating } = useData();
    const [btn, setBtn] = useState(1);
    const [sub, setSub] = useState(1);
    const { isDesktop } = useMedia();;
    const [showItems, setShowItems] = useState(true);
    const [showImg, setShowImg] = useState(false);
    const searchRef = useRef(null);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (isDesktop) {
            setShowItems(false);
        }

        if (searchFocus) {
            searchRef.current.focus();
        }
    }, [isDesktop, searchFocus])

    useEffect(() => {
        if (tree) {
            setBtn(tree.data[0].id)
            setSub(tree.data[0].children[0].id)
        }
    }, [tree]);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [menuOpen]);

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

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        router.push({
            pathname: '/search',
            query: { searchValue }
        })
        setMenuOpen(false);
        setSearchValue('');
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    if (!treeValidating) {
        return (
            <div
                className={`${styles.container} ${menuOpen ? styles.menuIsOpen : styles.menuIsClosed}`}
            >
                <div className={styles.menu} ref={wrapperRef}>
                    {
                        !isDesktop ? (
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
                                    <form onSubmit={handleSearch}>
                                        <input
                                            onChange={handleChange}
                                            ref={searchRef}
                                            type="text"
                                            placeholder='Я ищу ...'
                                            className='focus:ring-0'
                                        />
                                    </form>
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
                                                    onMouseOver={() => {
                                                        setSub(item.id)
                                                        setShowImg(true)
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
                        <Link
                            href={`categories/${tree?.data.filter(item => item.id === btn)[0].children.filter(item => item.id == sub)[0]?.id}-${tree?.data.filter(item => item.id === btn)[0].children.filter(item => item.id == sub)[0]?.slug}`}
                            className={`${styles.img} ${showImg ? 'visible opacity-100' : 'invisible opacity-0'} transition duration-300`}>
                            <div>
                                <Image
                                    src={tree?.data.filter(item => item.id === btn)[0].children.filter(item => item.id == sub)[0]?.img}
                                    alt=""
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                />
                            </div>
                            <p>{tree?.data.filter(item => item.id === btn)[0].children.filter(item => item.id == sub)[0]?.name}</p>
                        </Link>
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