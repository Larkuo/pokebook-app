import './AppHeader.css';
import AppLogo from '../../assets/pokebook-logo.svg';
import { AppThemeType, colors } from '../../theme/theme';
import { Link } from 'react-router-dom';
import { ThemePickerModal } from '..';
import SearchIcon from '../../assets/search-icon-grey.svg';

interface AppHeaderProps{
    theme: AppThemeType;
    searchValue?: string;
    onChangeSearchValue: (value: string) => void;
    showThemeModal: boolean;
    setShowThemeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AppHeader({
    theme,
    searchValue,
    onChangeSearchValue,
    showThemeModal,
    setShowThemeModal,
}:AppHeaderProps) {
    return (
        <div className='app-header'>
            <Link to={'/'} className='logo-link'>
                <img 
                    src={AppLogo}
                    className='listpage-app-logo'
                    alt='pokebook-logo'
                />
                <span className='listpage-app-logo-text'>
                    Poké<span style={{color: colors[theme]}}>book</span>
                </span>
            </Link>
            <div className='list-search-container'>
                <img
                    alt='search-icon'
                    src={SearchIcon}
                    className='list-search-icon'
                />
                <input
                    className='list-search-bar'
                    placeholder='Enter pokemon name'
                    value={searchValue}
                    onChange={(event) => {
                        onChangeSearchValue(event.target.value);
                    }}
                />
            </div>
            <button 
                className='theme-button-circle'
                onClick={() => setShowThemeModal(true)}
            >
                <div 
                    className='theme-button-inner-circle'
                    style={{
                        color: colors[theme],
                        backgroundColor: colors[theme],
                    }}
                >|</div>
            </button>
            {showThemeModal && 
                <ThemePickerModal
                    closeModal={() => setShowThemeModal(false)}
                />
            }
        </div>
    );
}
