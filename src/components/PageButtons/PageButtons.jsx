import { useRouter } from 'next/router';
import { useLang } from '../../hooks/useLang';
import ReactPaginate from 'react-paginate';
import { useMedia } from '../../context/screenContext';

import styles from './PageButtons.module.scss'
import { useEffect, useState } from 'react';

const PageButtons = ({ data, search, setPage, page, stage, setStage }) => {
    const router = useRouter();
    const lang = useLang();
    const { isDesktop } = useMedia();
    const [pageData, setPageData] = useState(data);

    const handlePageClick = (event) => {
        setPage(null);
        router.push(`${router.asPath.split('?')[0]}?${search ? `value=${search}&` : ''}page=${event.selected + 1}`)
    };

    return (
        <div className={styles.container}>
            <ReactPaginate
                previousLabel={
                    <button>
                        <svg
                            viewBox="0 0 24 24"
                            width={17}
                            height={16}
                            fill="none"
                            stroke="#828282"
                        >
                            <use xlinkHref="#arr-left"></use>
                        </svg>
                    </button>
                }
                nextLabel={
                    <button>
                        <svg
                            viewBox="0 0 24 24"
                            width={17}
                            height={16}
                            fill="none"
                            stroke="#828282"
                        >
                            <use xlinkHref="#arr-right"></use>
                        </svg>
                    </button>
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={!isDesktop ? 1 : 2}
                marginPagesDisplayed={1}
                pageCount={pageData.meta.last_page}
                forcePage={router.query.page ? router.query.page - 1 : null}
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
            <button
                className={styles.showMore}
                onClick={() => {
                    page ? setPage(+page + 1) : router.query.page ? setPage(+router.query.page + 1) : setPage(2)
                }}
            >
                {lang?.['Показать еще']}
            </button>

        </div >
    )
}

export default PageButtons;