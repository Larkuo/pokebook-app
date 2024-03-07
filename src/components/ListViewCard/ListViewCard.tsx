import { useState } from 'react';
import { useListItemDetails } from '../../hooks/useListItemDetails';
import { AppThemeType, colors } from '../../theme/theme';
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

    return (
        <div 
            className='list-view-card'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
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
        </div>
    );
}
