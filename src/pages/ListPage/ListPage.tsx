import { useParams } from 'react-router-dom';
import { AppHeader } from '../../components';
import './ListPage.css';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../theme/ThemeContext';

export function ListPage() {
    const { searchTerm } = useParams();
    const { theme } = useContext(ThemeContext);

    const [searchValue, setSearchValue] = useState(searchTerm || '');
    const [showThemeModal, setShowThemeModal] = useState(false);

    function search(value: string){
        setSearchValue(value);
        console.log('search list for name: ', searchValue);
    }

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
                List View Page
            </div>
        </div>
    );
}
