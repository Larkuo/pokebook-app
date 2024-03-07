import { useNavigate, useParams } from 'react-router-dom';
import { AppHeader, ListViewCard, PaginationRow } from '../../components';
import './ListPage.css';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { useListDetails } from '../../hooks/useLListDetails';
import { colors } from '../../theme/theme';

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

    const [tempHover, setTempHover] = useState(false);

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
                {pokemonList.length < 1 && 
                    <h2 style={{width: '60%', textAlign: 'center', marginBottom: '5vh'}}>
                        Sorry, we could not find any pokemon named <span style={{color: colors[theme]}}>{searchValue}</span> or similar.
                        Try again with another search.
                    </h2>
                }
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
