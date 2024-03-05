import './HomePage.css';
import AppLogo from '../../assets/pokebook-logo.svg';
import AppLogoText from '../../assets/pokebook-logo-text.svg';
import SearchIcon from '../../assets/search-icon.svg';
import { Link } from 'react-router-dom';

export function HomePage() {
    return (
        <div className='home-page'>
            <img 
                src={AppLogo}
                className='homepage-app-logo'
                alt='pokebook-logo'
            />
            <img 
                src={AppLogoText}
                className='homepage-app-logo-text'
                alt='pokebook-logo-text'
            />
            <span className='homepage-hero-text'>
                Largest Pokémon index with information about every Pokemon you can think of. 
            </span>
            <div className='search-container'>
                <input
                    className='search-bar'
                    placeholder='Enter pokemon name'
                />
                <div className='search-icon-container'>
                    <img 
                        src={SearchIcon}
                        className='homepage-search-icon'
                        alt='search-icon'
                    />
                </div>
            </div>
            <Link className='view-all-link' to={'/list'}>
                View All
            </Link>
        </div>
    );
}
