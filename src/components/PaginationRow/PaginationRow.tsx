import { PageLimitType } from '../../hooks/useLListDetails';
import './PaginationRow.css';
import ChevronLeftIcon from '../../assets/chevron-left.svg';
import ChevronRightIcon from '../../assets/chevron-right.svg';
import EllipsesIcon from '../../assets/page-ellipses.svg';
import ChevronDownIcon from '../../assets/chevron-down.svg';
import { AppThemeType, colors } from '../../theme/theme';
import { useState } from 'react';

interface PaginationRowProps{
    currentPage: number;
    pageCount: number;
    nextPage: () => void;
    previousPage: () => void;
    gotoPage: (page: number) => void;
    pageLimit: PageLimitType;
    changePageLimit: (newLimit: PageLimitType) => void;
    theme: AppThemeType;
}

export function PaginationRow({
    pageCount,
    currentPage,
    nextPage,
    previousPage,
    gotoPage,
    pageLimit,
    changePageLimit,
    theme,
}: PaginationRowProps) {
    const LIMITS_DATA: PageLimitType[] = [8, 12, 16, 24];

    const pageNearLast = currentPage < pageCount && currentPage > 4? currentPage : 4;
    const pages = pageCount > 6
        ? [1, 2, 3, pageNearLast]
        : [...Array(pageCount).keys()].map(page => page+1);

    const [showLimitDropdown, setShowLimitDropdown] = useState(false);

    return (
        <div className='pagination-row' style={{height: showLimitDropdown? '25vh' : '15vh'}}>
            <div className='pagination-button-container'>
                <button 
                    className='pagination-button'
                    style={{backgroundColor: '#E1E1E1'}}
                    onClick={previousPage}
                >
                    <img 
                        src={ChevronLeftIcon}
                        alt='previous page icon' 
                        className='chevron-icon'
                    />
                </button>
                {pages.map((page) => 
                    <button 
                        key={page}
                        className='pagination-button'
                        style={{
                            backgroundColor: page === currentPage? colors[theme] : '#E1E1E1',
                            color: page === currentPage? 'white' : 'black',
                            marginLeft: '2%',
                        }}
                        onClick={() => gotoPage(page)}
                    >{page}</button>
                )}
                {pageCount > 6 &&
                    <img 
                        src={EllipsesIcon}
                        alt='ellipses icon'
                        className='ellipses-icon'
                        style={{
                            marginLeft: '2%',
                            marginRight: '2%'
                        }}
                    />
                }
                {pageCount > 6 && 
                    <button 
                        className='pagination-button'
                        style={{
                            backgroundColor: pageCount === currentPage? colors[theme] : '#E1E1E1',
                            color: pageCount === currentPage? 'white' : 'black',
                        }}
                        onClick={() => gotoPage(pageCount)}
                    >{pageCount}</button>
                }
                <button 
                    className='pagination-button'
                    style={{backgroundColor: '#E1E1E1', marginLeft: '2%'}}
                    onClick={nextPage}
                >
                    <img 
                        src={ChevronRightIcon}
                        alt='next page icon'
                        className='chevron-icon'
                    />
                </button>
            </div>
            <div className='pagination-limit-dropdown'>
                <div className='pagination-limit-container'>
                    <div className='pagination-limit'>{pageLimit}</div>
                    <button 
                        className='pagination-limit-button'
                        onClick={() => setShowLimitDropdown(!showLimitDropdown)}
                    >
                        <img 
                            src={ChevronDownIcon}
                            alt='next page icon'
                            className='chevron-icon'
                        />
                    </button>
                </div>
                {showLimitDropdown &&
                    <div className='limit-dropdown-list'>
                        {LIMITS_DATA.map((limit) => limit !== pageLimit &&
                            <div 
                                key={limit}
                                className='limit-dropdown-item'
                                onClick={() => {
                                    setShowLimitDropdown(false);
                                    changePageLimit(limit);
                                }}
                            >{limit}</div>
                        )}
                    </div>
                }
            </div>
        </div>
    );
}
