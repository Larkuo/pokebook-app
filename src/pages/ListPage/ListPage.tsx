import { useParams } from 'react-router-dom';
import { AppHeader, ListViewCard } from '../../components';
import './ListPage.css';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { useListDetails } from '../../hooks/useLListDetails';

export function ListPage() {
    const { searchTerm } = useParams();
    const { theme } = useContext(ThemeContext);

    const [showThemeModal, setShowThemeModal] = useState(false);

    const [searchLimit, setSearchLimit] = useState(8);
    const [searchOffset, setSearchOffset] = useState(0);

    const {
        searchValue,
        search,
        pokemonList,
    } = useListDetails(searchLimit, searchOffset, searchTerm);

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
                {pokemonList.map((value, index) => 
                    <ListViewCard
                        key={`${index} - ${value.name}`}
                        name={value.name}
                        url={value.url}
                    />
                )}
            </div>
        </div>
    );
}
