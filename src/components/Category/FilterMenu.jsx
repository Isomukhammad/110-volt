import { useEffect, useState } from 'react';
import InputRadio from '../InputRadio/InputRadio';
import FormCheckbox from '../FormCheckbox/FormCheckbox';
import FilterOption from '../FilterOption/FilterOption';
import FormInputRange from '../FormInputRange/FormInputRange';
import { useData } from '../../context/dataContext';
import styles from './FilterMenu.module.scss';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';

const FilterMenu = ({ attributes, brands, prices, loading, category, products, filterOpen, setFilterOpen }) => {
    // const [brands, setBrands] = useState([]);
    const [space, setSpace] = useState([]);
    const [sim, setSim] = useState([]);
    const [checkedRadio, setCheckedRadio] = useState(null);
    const [maxValue, setMaxValue] = useState('');
    const [minValue, setMinValue] = useState('');
    const { tree } = useData();

    // const handleBrandChange = (event) => {
    //     if (brands.includes(event.target.name)) {
    //         const filteredList = brands.filter((item) => {
    //             return item !== event.target.name;
    //         })
    //         setBrands(filteredList);

    //     } else if (!brands.includes(event.target.name)) {
    //         setBrands((oldList) => [...oldList, event.target.name])
    //     }
    // }

    const { data: subcast } = useSWR(
        `categories/${category.id}/subcategories`,
        fetcher
    )

    const handleRangeChange = (event) => {
        console.log(event.target.value);
    }

    const handleRadioChange = (event) => {
        if (checkedRadio != event.target.value) {
            console.log(event.target.value);
            setCheckedRadio(event.target.value)
        } else {
            console.log(event.target.value);
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

    return (
        <div className={`${styles.container} ${filterOpen ? styles.filterOpen : ''}`}>
            <div className={styles.closeButton} onClick={() => setFilterOpen(false)}>
                <h2 className='font-semibold text-[20px]'>Фильтры</h2>
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
            <FilterOption title={'Бренды'}>
                <form>
                    <FormCheckbox
                        name="Apple"
                        handleChange={null}
                    />
                    <FormCheckbox
                        name="Samsung"
                        handleChange={null}
                    />
                    <FormCheckbox
                        name="Xiaomi"
                        handleChange={null}
                    />
                    <FormCheckbox
                        name="Huawei"
                        handleChange={null}
                    />
                    <FormCheckbox
                        name="Lenovo"
                        handleChange={null}
                    />
                    <FormCheckbox
                        name="HP"
                        handleChange={null}
                    />
                    <FormCheckbox
                        name="Sony"
                        handleChange={null}
                    />
                    <FormCheckbox
                        name="OnePlus"
                        handleChange={null}
                    />
                </form>
            </FilterOption>

            <FilterOption title="Цена">
                <FormInputRange
                    min={0}
                    max={999999999}
                />
            </FilterOption>

            <FilterOption title="Объем встроенной памяти">
                <form>
                    <FormCheckbox
                        name="1 ТБ"
                        handleChange={handleSpaceChange}
                    />
                    <FormCheckbox
                        name="256 ГБ"
                        handleChange={handleSpaceChange}
                    />
                    <FormCheckbox
                        name="128 ГБ"
                        handleChange={handleSpaceChange}
                    />
                    <FormCheckbox
                        name="64 ГБ"
                        handleChange={handleSpaceChange}
                    />
                    <FormCheckbox
                        name="32 ГБ"
                        handleChange={handleSpaceChange}
                    />
                </form>
            </FilterOption>

            <FilterOption title="Количество и тип SIM-карты">
                <form>
                    <FormCheckbox
                        name="Dual-Sim (nano-sim)"
                        handleChange={handleSimChange}
                    />
                    <FormCheckbox
                        name="1 (Nano Sim)"
                        handleChange={handleSimChange}
                    />
                    <FormCheckbox
                        name="2 (Nano-SIM + eSIM)"
                        handleChange={handleSimChange}
                    />
                    <FormCheckbox
                        name="2 nano-SIM"
                        handleChange={handleSimChange}
                    />
                </form>
            </FilterOption>

            <FilterOption title="Цвет">
                <form className={styles.radios}>
                    <InputRadio
                        name='color'
                        color='red'
                        value="red"
                    />
                    <InputRadio
                        name='color'
                        color='black'
                        value='black'
                    />
                    <InputRadio
                        name='color'
                        color='white'
                        value='white'
                    />
                    <InputRadio
                        name='color'
                        color='purple'
                        value='purple'
                    />
                    <InputRadio
                        name='color'
                        color='orange'
                        value='orange'
                    />
                    <InputRadio
                        name='color'
                        color='blue'
                        value='blue'
                    />
                </form>
            </FilterOption>
        </div>
    )
}

export default FilterMenu;