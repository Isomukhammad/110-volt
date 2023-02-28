import { useEffect, useState } from 'react';
import InputRadio from '../Input/InputRadio';
import InputCheckbox from '../Input/InputCheckbox';
import FilterOption from './FilterOption';
import InputRange from '../Input/InputRange';
import { useData } from '../../context/dataContext';
import styles from './FilterMenu.module.scss';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import { useParams } from '../../hooks/useParams';
import { useLang } from '../../hooks/useLang';
import { useRouter } from 'next/router';

const FilterMenu = ({ attributes, brands, prices, loading, category, products, filterOpen, setFilterOpen }) => {
    const router = useRouter();
    const lang = useLang();
    const [space, setSpace] = useState([]);
    const [sim, setSim] = useState([]);
    const { updateParams, checkParams, findParams, resetParams } = useParams();
    const [checkedRadio, setCheckedRadio] = useState(null);
    const [maxValue, setMaxValue] = useState('');
    const [minValue, setMinValue] = useState('');
    const [color, setColor] = useState('')

    const { data: subcast } = useSWR(
        `/categories/${category.id}/subcategories`,
        fetcher
    )

    const handleRadioChange = (event) => {
        if (checkedRadio != event.target.value) {
            setCheckedRadio(event.target.value)
        } else {
            setCheckedRadio(null)
        }
    }

    const handleSpaceChange = (event) => {
        if (space.includes(event.target.name)) {
            const filteredList = space.filter((item) => {
                return item !== event.target.name;
            })
            setSpace(filteredList);

        } else if (!space.includes(event.target.name)) {
            setSpace((oldList) => [...oldList, event.target.name])
        }
    }

    const handleSimChange = (event) => {
        if (sim.includes(event.target.name)) {
            const filteredList = sim.filter((item) => {
                return item !== event.target.name;
            })
            setSim(filteredList);

        } else if (!sim.includes(event.target.name)) {
            setSim((oldList) => [...oldList, event.target.name])
        }
    }

    useEffect(() => {
        if (findParams('price')) {
            setMaxValue(findParams('price').split('=')[1].split('-')[1])
            setMinValue(findParams('price').split('=')[1].split('-')[0])
        } else if (prices) {
            setMaxValue(prices.max)
            setMinValue(prices.min)
        }
    })

    return (
        <div className={`${styles.container} ${filterOpen ? styles.filterOpen : ''}`}>
            <div className={styles.closeButton} onClick={() => setFilterOpen(false)}>
                <h2 className='font-semibold text-[20px]'>{lang?.['Фильтры']}</h2>
                <svg
                    viewBox='0 0 24 24'
                    width={24}
                    height={24}
                    fill="#BDBDBD"
                    onClick={() => setFilterOpen(false)}
                >
                    <use xlinkHref='#close'></use>
                </svg>
            </div>
            <FilterOption title={lang?.['Бренды']}>
                <div className='flex flex-col gap-3'>
                    {
                        brands.map((brand) => (
                            <InputCheckbox
                                name={brand.name}
                                key={brand.id}
                                id={`brand-${brand.id}`}
                                onChange={() => {
                                    console.log(router.query)
                                    updateParams('brand', `${brand.id}-${brand.slug}`)
                                }}
                                checked={checkParams('brand', `${brand.id}-${brand.slug}`)}
                            />
                        ))
                    }
                </div>
            </FilterOption>

            <FilterOption title={lang?.['Цена']}>
                <InputRange
                    min={0}
                    max={prices.max}
                />
            </FilterOption>

            {attributes.map((attr) => {
                if (
                    attr.used_for_filter &&
                    attr.attribute_values.some((value) => value.used_for_filter)
                ) {
                    return (
                        <div key={attr.id}>
                            <FilterOption title={attr.name}>
                                <div className='flex flex-col gap-3'>
                                    {
                                        attr.attribute_values.map((value) => {
                                            if (value.used_for_filter) {
                                                return (
                                                    <InputCheckbox
                                                        name={value.name}
                                                        key={value.id}
                                                        id={`attribute-${value.id}`}
                                                        onChange={() => {
                                                            updateParams('attribute', `${value.id}-${value.slug}`)
                                                        }}
                                                        checked={checkParams('attribute', `${value.id}-${value.slug}`)}
                                                    />
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </FilterOption>
                        </div>
                    )
                }
            })}

            {/* {
                attributes.map((attr) => {
                    if (
                        attr.used_for_filter &&
                        attr.slug === 'cvet'
                    ) {
                        return (
                            <div key={attr.id}>
                                <FilterOption title={attr.name}>
                                    <form
                                        key={attr.id}
                                        className={styles.radios}
                                    >
                                        {
                                            attr.attribute_values.map((value) => {
                                                if (value.used_for_filter) {
                                                    return (
                                                        <div key={value.id}>
                                                            <InputRadio
                                                                name='color'
                                                                color={value.slug}
                                                                value={value.slug}
                                                                onChange={() => {
                                                                    updateParams(
                                                                        'attribute',
                                                                        `${findParams('attribute') ? findParams('attribute').split('=')[1].replace(color, '1000-pink') : `${value.id}-${value.slug}`}`
                                                                    )
                                                                    setColor(`${value.id}-${value.slug}`)
                                                                }}
                                                                checked={checkParams('attribute', `${value.id}-${value.slug}`)}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </form>
                                </FilterOption>
                            </div>
                        )
                    }
                })
            } */}
        </div >
    )
}

export default FilterMenu;