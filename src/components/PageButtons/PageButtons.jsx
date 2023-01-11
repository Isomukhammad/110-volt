import { useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ScreenContext } from '../../context/screenContext';

import styles from './PageButtons.module.scss'

const PageButtons = () => {
    const [itemOffset, setItemOffset] = useState(0);
    const { isMobile } = useContext(ScreenContext);

    const handlePageClick = (event) => {
        const newOffset = event.selected * 20 % 60;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    return (
        <div className={styles.container}>
            <ReactPaginate
                previousLabel={
                    <svg
                        viewBox="0 0 17 16"
                        width={17}
                        height={16}
                        fill="none"
                        stroke="#828282"
                    >
                        <use xlinkHref="#arrow-right"></use>
                    </svg>
                }
                nextLabel={
                    <svg
                        viewBox="0 0 17 16"
                        width={17}
                        height={16}
                        fill="none"
                        stroke="#828282"
                    >
                        <use xlinkHref="#arrow-right"></use>
                    </svg>
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={isMobile ? 1 : 2}
                marginPagesDisplayed={1}
                pageCount={20}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link previous-page"
                nextClassName="page-item"
                nextLinkClassName="page-link next-page"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
            <div className={styles.showMore}>
                Показать ещё
            </div>

        </div>
    )
}

export default PageButtons;