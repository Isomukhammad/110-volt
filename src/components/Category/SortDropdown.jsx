import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'

import { useLang } from '../../hooks/useLang'

import { useSort } from '../../context/sortContext'

const SortDropdown = () => {
    const lang = useLang();
    const [choice, setChoice] = useState(lang?.['Популярности']);
    const { setIsPopular, isPopular, sortBy, setSortBy } = useSort();

    return (
        <div className="">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="text-[14px] font-semibold text-secondary">
                        <div className='flex flex-row items-center'>
                            <p className='mt-1'>{choice}</p>
                            <svg
                                viewBox="0 0 24 24"
                                width={22}
                                height={22}
                                fill="#BDBDBD"
                                className='rotate-90'
                            >
                                <use xlinkHref='#arrow-ios-forward'></use>
                            </svg>
                        </div>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute left-[-4em] mt-2 w-56 origin-top-right divide-y divide-transparent rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[1] font-semibold">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${active ? 'bg-accent text-white' : 'text-secondary'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    onClick={() => {
                                        setChoice(lang?.['Популярности']);
                                        setSortBy({ "by": "", "direction": "" });
                                        setIsPopular(true);
                                    }}
                                >
                                    {lang?.['Популярности']}
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${active ? 'bg-accent text-white' : 'text-secondary'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    onClick={() => {
                                        setChoice(lang?.['Новинкам'])
                                        setIsPopular(false);
                                        setSortBy({ "by": "created_at", "direaction": "desc" })
                                    }}
                                >
                                    {lang?.['Новинкам']}
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${active ? 'bg-accent text-white' : 'text-secondary'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    onClick={() => {
                                        setChoice(lang?.['Цене']);
                                        setIsPopular(false)
                                        setSortBy({ "by": "price", "direction": "asc" })
                                    }}
                                >
                                    {lang?.['Цене']} ({lang?.['по возрастанию']})
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${active ? 'bg-accent text-white' : 'text-secondary'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    onClick={() => {
                                        setChoice(lang?.['Цене']);
                                        setIsPopular(false)
                                        setSortBy({ "by": "price", "direction": "desc" })
                                    }}
                                >
                                    {lang?.['Цене']} ({lang?.['в убыванию']})
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${active ? 'bg-accent text-white' : 'text-secondary'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    onClick={() => {
                                        setChoice(lang?.['Скидкам']);
                                        setSortBy({ "by": "is_promotion", "direction": "" });
                                        setIsPopular(false);
                                    }}
                                >
                                    {lang?.['Скидкам']}
                                </button>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default SortDropdown;