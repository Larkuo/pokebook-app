import './HomePage.css';
import AppLogo from '../../assets/pokebook-logo.svg';
import SearchIcon from '../../assets/search-icon-white.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { colors } from '../../theme/theme';

export function HomePage() {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');

    function search(){
        navigate(`list/${searchTerm}`);
    }

    return (
        <div className='home-page'>
            <img 
                src={AppLogo}
                className='homepage-app-logo'
                alt='pokebook-logo'
            />
            <span className='homepage-app-logo-text'>
                Poké<span style={{color: colors[theme]}}>book</span>
            </span>
            <span className='homepage-hero-text'>
                Largest Pokémon index with information about every Pokemon you can think of. 
            </span>
            <div 
                className='search-container'
                style={{border: `10px solid ${colors[theme]}`}}
            >
                <input
                    className='search-bar'
                    placeholder='Enter pokemon name'
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button 
                    className='search-icon-container'
                    style={{backgroundColor: colors[theme]}}
                    onClick={search}
                >
                    <img 
                        src={SearchIcon}
                        className='homepage-search-icon'
                        alt='search-icon'
                    />
                </button>
            </div>
            <Link className='view-all-link' to={'/list'}>
                View All
            </Link>
        </div>
    );
}
