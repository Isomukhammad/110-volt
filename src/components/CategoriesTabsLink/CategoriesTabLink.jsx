import Link from "next/link";

const CategoriesTabsLink = ({ title, url }) => {
    if (!title && !url) {
        return null;
    }

    return (
        <Link href={`${url}`} className='text-[14px] gap-2 font-semibold lg:text-[18px] text-placeholder flex flex-row items-center lg:gap-3 transition duration-300 group hover:text-accent font-segoe'>
            <p className="whitespace-nowrap">{title}</p>
            <svg viewBox="0 0 24 24" className='w-4 h-4 stroke-placeholder fill-none group-hover:stroke-accent transition duration-300' style={{ strokeWidth: '2' }}>
                <use xlinkHref='#arr-right'></use>
            </svg>
        </Link>
    )
}

export default CategoriesTabsLink;

// font-family: "Segoe UI";