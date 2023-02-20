import styles from './InputRadio.module.scss';

const InputRadio = ({ slug, color, value, ...otherProps }) => {
    console.log(color)
    const red = color === "red" ? styles.red : '';
    const black = color === "black" ? styles.black : '';
    const mysticBlack = color === 'mystic-black' ? styles.mysticBlack : '';
    const prismBlack = color === 'prism-black' ? styles.prismBlack : '';
    const white = color === "white" ? styles.white : '';
    const gray = color === "grey" ? styles.gray : '';
    const gold = color === "gold" ? styles.gold : '';
    const bronze = color === "bronze" ? styles.bronze : '';

    return (
        <div className={`${styles.container} ${white} ${gray} ${red} ${black} ${gold} ${bronze}`}>
            <input
                type="radio"
                name={slug}
                value={value}
                className="ring-0 ring-transparent outline-transparent border-transparent focus:ring-transparent focus:border-transparent focus:outline-transparent"
                {...otherProps}
            />
        </div>
    )
}

export default InputRadio;