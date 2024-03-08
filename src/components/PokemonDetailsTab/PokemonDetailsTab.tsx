import { useContext } from 'react';
import './PokemonDetailsTab.css';
import { ThemeContext } from '../../theme/ThemeContext';
import { colors } from '../../theme/theme';
import { useListItemDetails } from '../../hooks/useListItemDetails';

interface AboutTabProps{
    height: number;
    weight: number;
    abilities: string[];
}

interface StatsTabProps{
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
}

interface SimilarTabProps{
    similarPokemon: {
        name: string
        url: string
    }[];
}

export function AboutTab({
    height,
    weight,
    abilities
}:AboutTabProps){
    return(
        <div className='about-tab'>
            <div className='about-row'>
                <div className='about-text-container about-right'>
                    <span className='about-label'>Height</span>
                </div>
                <div className='about-text-container'>
                    <span className='about-value'>{height.toFixed(1)}m</span>
                </div>
            </div>
            <div className='row-divider'/>
            <div className='about-row'>
                <div className='about-text-container about-right'>
                    <span className='about-label'>Weight</span>
                </div>
                <div className='about-text-container'>
                    <span className='about-value'>{weight.toFixed(1)}kg</span>
                </div>
            </div>
            <div className='row-divider'/>
            <div className='about-row'>
                <div className='about-text-container about-right'>
                    <span className='about-label'>Abilities</span>
                </div>
                <div className='about-abilities-group about-text-container'>
                    {abilities.map((ability, index) =>
                        <span
                            key={`${index}-${ability}`}
                            className='about-value'
                        >• {ability}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export function StatsTab({
    hp,
    attack,
    defense,
    special_attack,
    special_defense,
    speed
}:StatsTabProps){
    const { theme } = useContext(ThemeContext);

    function StatsItem({name, value}: {name: string, value: number}) {
        return(
            <div className='stats-row'>
                <div className='stats-label-container'>
                    <span className='stats-label'>{name}</span>
                </div>
                <div className='stats-bar'>
                    <div 
                        className='stats-inner-bar'
                        style={{
                            backgroundColor: colors[theme],
                            width: `${(value/255)*100}%`,
                        }}
                    ></div>
                </div>
                <div className='stats-value-container'>
                    <span className='stats-value'>{value}</span>
                </div>
            </div>
        );
    }
    
    return(
        <div className='stats-tab'>
            <StatsItem name={'HP'} value={hp}/>
            <div className='row-divider'/>
            <StatsItem name={'Attack'} value={attack}/>
            <div className='row-divider'/>
            <StatsItem name={'Defense'} value={defense}/>
            <div className='row-divider'/>
            <StatsItem name={'Special Attack'} value={special_attack}/>
            <div className='row-divider'/>
            <StatsItem name={'Special Defense'} value={special_defense}/>
            <div className='row-divider'/>
            <StatsItem name={'Speed'} value={speed}/>
        </div>
    );
}

export function SimilarTab({
    similarPokemon,
}:SimilarTabProps){
    function SimilarCard({
        name, 
        url
    }:{name: string, url: string}){
        const { pokemonDetails } = useListItemDetails(url);
        return(
            <div className='similar-card'>
                <div className='similar-card-sprite-container'>
                    <img 
                        alt={`similar pokemon - ${name} image`}
                        className='similar-card-sprite'
                        src={pokemonDetails.sprite}
                    />
                </div>
                <span className='similar-card-name'>{name}</span>
            </div>
        );
    }
    return(
        <div className='similar-tab'>
            {similarPokemon.map((value, index) => 
                <SimilarCard 
                    key={`${index}-${value.name}`}
                    name={value.name}
                    url={value.url}
                />
            )}
        </div>
    );
}

