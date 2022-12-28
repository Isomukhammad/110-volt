import { useEffect, useState } from 'react';
import RadioButton from '../FilterRadio/FilterRadio';
import FormCheckbox from '../FormCheckbox/FormCheckbox';
import styles from './FilterMenu.module.scss';

const FilterMenu = ({ products }) => {
    const [brands, setBrands] = useState([]);
    const [space, setSpace] = useState([]);
    const [sim, setSim] = useState([]);

    const handleBrandChange = (event) => {
        if (brands.includes(event.target.name)) {
            const filteredList = brands.filter((item) => {
                return item !== event.target.name;
            })
            setBrands(filteredList);

        } else if (!brands.includes(event.target.name)) {
            setBrands((oldList) => [...oldList, event.target.name])
        }
    }

    const handleRangeChange = (event) => {
        console.log(event.target.value);
    }

    const handleRadioChange = (event) => {
        console.log(event.target.value);
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
        console.log(sim)
    }, [sim])
    return (
        <div className={styles.container}>
            <div className={styles.category}>
                <h3>Бренды</h3>

                <form>
                    <FormCheckbox
                        name="Apple"
                        handleChange={handleBrandChange}
                    />
                    <FormCheckbox
                        name="Samsung"
                        handleChange={handleBrandChange}
                    />
                    <FormCheckbox
                        name="Xiaomi"
                        handleChange={handleBrandChange}
                    />
                    <FormCheckbox
                        name="Huawei"
                        handleChange={handleBrandChange}
                    />
                    <FormCheckbox
                        name="Lenovo"
                        handleChange={handleBrandChange}
                    />
                    <FormCheckbox
                        name="HP"
                        handleChange={handleBrandChange}
                    />
                    <FormCheckbox
                        name="Sony"
                        handleChange={handleBrandChange}
                    />
                    <FormCheckbox
                        name="OnePlus"
                        handleChange={handleBrandChange}
                    />
                </form>
            </div>

            <div className={styles.category}>
                <h3>Цена</h3>
                <input type="range" min="0" max="100000000" step="10" onChange={handleRangeChange} />
            </div>

            <div className={styles.category}>
                <h3>Объем встроенной памяти</h3>
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
            </div>

            <div className={styles.category}>
                <h3>Количество и тип SIM-карты</h3>

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
            </div>

            <div className={styles.category}>
                <h3>Цвет</h3>
                <form className={styles.radios}>
                    <RadioButton
                        name='color'
                        color='red'
                    />
                    <RadioButton
                        name='color'
                        color='black'
                    />
                    <RadioButton
                        name='color'
                        color='white'
                    />
                    <RadioButton
                        name='color'
                        color='purple'
                    />
                    <RadioButton
                        name='color'
                        color='orange'
                    />
                    <RadioButton
                        name='color'
                        color='blue'
                    />
                </form>
            </div>
        </div>
    )
}

export default FilterMenu;