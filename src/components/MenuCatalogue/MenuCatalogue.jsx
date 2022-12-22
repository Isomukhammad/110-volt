import { useEffect } from 'react';

const MenuCatalogue = ({ catalogues, btn, setBtn }) => {
    return (
        <div className='menuCatalogue'>
            {
                catalogues.map((item) => (
                    <button
                        key={item.id}
                        className={item.id === btn ? `active` : null}
                        onMouseOver={() => setBtn(item.id)}
                    >
                        <svg width={24} height={24} viewBox='0 0 24 24' fill='#828282' stroke="#828282"
                        >
                            <use xlinkHref={`#${item.logo}`}></use>
                        </svg>
                        {item.title}
                    </button>
                ))
            }
        </div>
    )
}

export default MenuCatalogue;