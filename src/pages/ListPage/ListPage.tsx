import { useNavigate, useParams } from 'react-router-dom';
import { AppHeader, ListViewCard, PaginationRow } from '../../components';
import './ListPage.css';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { useListDetails } from '../../hooks/useLListDetails';

export function ListPage() {
    const { searchTerm } = useParams();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    const [showThemeModal, setShowThemeModal] = useState(false);

    const {
        searchValue,
        search,
        pokemonList,
        currentPage,
        pageCount,
        nextPage,
        previousPage,
        gotoPage,
        pageLimit,
        changePageLimit,
    } = useListDetails(navigate, searchTerm);

    return (
        <div className='list-view-page'>
            <AppHeader
                theme={theme}
                searchValue={searchValue}
                onChangeSearchValue={search}
                showThemeModal={showThemeModal}
                setShowThemeModal={setShowThemeModal}
            />
            <div className='list-page-content'>
                <div className='list-card-container'>
                    {pokemonList.map((value, index) => 
                        <ListViewCard
                            key={`${index} - ${value.name}`}
                            name={value.name}
                            url={value.url}
                            theme={theme}
                        />
                    )}
                </div>
                <PaginationRow 
                    currentPage={currentPage} 
                    pageCount={pageCount}
                    pageLimit={pageLimit}  
                    nextPage={nextPage} 
                    previousPage={previousPage} 
                    gotoPage={gotoPage} 
                    changePageLimit={changePageLimit}
                    theme={theme}
                />
            </div>
        </div>
    );
}
