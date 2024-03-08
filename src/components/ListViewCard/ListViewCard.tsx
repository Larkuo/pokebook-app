import { useState } from 'react';
import { PokemonDetailsInterface, useListItemDetails } from '../../hooks/useListItemDetails';
import { AppThemeType, colors } from '../../theme/theme';
import EyeIcon from '../../assets/eye-icon.svg';

import './ListViewCard.css';

interface ListViewCardProps{
    name: string;
    url: string;
    theme: AppThemeType;
    viewPokemon: (pokemon: PokemonDetailsInterface) => void;
}

export function ListViewCard({
    name,
    url,
    theme,
    viewPokemon
}:ListViewCardProps) {
    const { pokemonDetails } = useListItemDetails(url);

    const [hover, setHover] = useState(false);

    // const PokemonCry = new Audio(pokemonDetails.cry);

    function onMouseEnter(){
        // pokemonDetails.cry && PokemonCry.play();
        setHover(true);
    }

    function onMouseLeave(){
        // pokemonDetails.cry && PokemonCry.pause();
        setHover(false);
    }

    function mobileHover(){
        setHover(!hover);
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
                        onClick={() => viewPokemon(pokemonDetails)}
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
