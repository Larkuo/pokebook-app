import { useState } from 'react';
import { useListItemDetails } from '../../hooks/useListItemDetails';
import { AppThemeType, colors } from '../../theme/theme';
import EyeIcon from '../../assets/eye-icon.svg';

import './ListViewCard.css';

interface ListViewCardProps{
    name: string;
    url: string;
    theme: AppThemeType;
}

export function ListViewCard({
    name,
    url,
    theme,
}:ListViewCardProps) {
    const { pokemonDetails } = useListItemDetails(url);

    const [hover, setHover] = useState(false);

    function onMouseEnter(){
        setHover(true);
    }

    function onMouseLeave(){
        setHover(false);
    }

    function mobileHover(){
        setHover(!hover);
    }

    function viewPokemon(){
        console.log(`view pokemon: ${pokemonDetails.name}`)
    }

    return (
        <div
            className='list-view-hover-container'
        >
            <div 
                className='list-view-card'
                style={{
                    zIndex: hover? '5' : '0',
                    height: hover? '45vh' : '35vh',
                }} 
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={mobileHover}
            >
                <div className='list-card-sprite-container'>
                    <img
                        alt={`${name} image`}
                        src={pokemonDetails.sprite}
                        className='list-card-sprite'
                    />
                </div>
                <span className='list-view-name'>{pokemonDetails.name}</span>
                <div className='list-card-types-container'>
                    {pokemonDetails.types && pokemonDetails.types.map((value, index) => 
                        <div 
                            className={`list-card-type ${index < (pokemonDetails.types.length-1) && 'type-margin'}`} 
                            key={`${index}-value`}
                        >{value}</div>
                    )}
                </div>
                {hover &&
                    <button 
                        className='view-more-button'
                        style={{backgroundColor: colors[theme]}}
                        onClick={viewPokemon}
                    >
                        View Pokemon
                        <img
                            src={EyeIcon}
                            alt='view pokemon icon'
                            className='view-more-icon'
                        />
                    </button>
                }
            </div>
        </div>
    );
}
