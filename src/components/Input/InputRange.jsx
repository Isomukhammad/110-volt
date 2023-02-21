import React, { useCallback, useEffect, useState, useRef } from "react";
import { useParams } from "../../hooks/useParams";

import styles from "./InputRange.module.scss";

const InputRange = ({ min, max, onChange }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(null);
    const maxValRef = useRef(null);
    const range = useRef(null);
    const { updateParams, findParams } = useParams();

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );



    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    const handleMinValueChange = (event) => {
        let value = event.target.value;

        if (value.charAt(0) == 0) {
            value = value.substring(1)
        }

        if (value.length === 0) {
            value = 0;
        }

        updateParams(
            'price',
            `${value}-${findParams('price') ? findParams('price').split('=')[1].split('-')[1] : max}`
        )
        setMinVal(value);
    }

    const handleMaxValueChange = (event) => {
        let value = event.target.value;

        if (value.charAt(0) == 0) {
            return false;
        }

        if (value.length === 0) {
            value = max;
        }

        updateParams(
            'price',
            `${findParams('price') ? findParams('price').split('=')[1].split('-')[0] : min}-${value}`
        )
        setMaxVal(value);
        setMaxVal(value);
    }

    return (
        <div className={styles.container}>
            <div className={styles.rangeInput}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    ref={minValRef}
                    onChange={(event) => {
                        const value = Math.min(+event.target.value, maxVal - 1);
                        updateParams(
                            'price',
                            `${event.target.value}-${findParams('price') ? findParams('price').split('=')[1].split('-')[1] : max}`
                        )
                        setMinVal(value);
                    }}
                    className={`${styles.thumb} ${styles.thumbZindex3} ${styles.thumbZindex5}`}
                />

                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    ref={maxValRef}
                    onChange={(event) => {
                        const value = Math.max(+event.target.value, minVal + 1);
                        updateParams(
                            'price',
                            `${findParams('price') ? findParams('price').split('=')[1].split('-')[0] : min}-${event.target.value}`
                        )
                        setMaxVal(value);
                    }}
                    className={`${styles.thumb} ${styles.thumbZindex4}`}
                />

                <div className={styles.slider}>
                    <div className={styles.track} />
                    <div ref={range} className={styles.range} />
                    <div className={styles.leftValue}>{minVal}</div>
                    <div className={styles.rightValue}>{maxVal}</div>
                </div>
            </div>

            <div className={styles.priceInput}>
                <input
                    type="text"
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }}
                    onChange={handleMinValueChange}
                    value={minVal}
                    placeholder={min}
                />
                -
                <input
                    type="text"
                    onChange={handleMaxValueChange}
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }}
                    value={maxVal}
                    placeholder={max}
                    className="outline-none focus:outline-none ring-none focus:ring-none"
                />
            </div>
        </div>
    );
};

export default InputRange;
