import { PokemonDetailsInterface } from '../../hooks/useListItemDetails';
import ArrowLeftIcon from '../../assets/arrow-left.svg';
import './PokemonDetailsModal.css';
import { useState } from 'react';
import { AboutTab, SimilarTab, StatsTab } from '..';

type ModalTabType = 'about' | 'stats' | 'similar';

interface PokemonDetailsModalProps{
    pokemonDetails: PokemonDetailsInterface;
    closeModal: () => void;
}

export function PokemonDetailsModal({
    pokemonDetails,
    closeModal
}:PokemonDetailsModalProps) {
    const [currentTab, setCurrentTab] = useState<ModalTabType>('about');
    const TAB_NAV_DATA: ModalTabType[] = ['about', 'stats', 'similar'];

    return (
        <div className='pokemon-details-modal'>
            <div className='pokemon-details-modal-body'>
                <div className='details-modal-header'>
                    <div className='back-button-row'>
                        <button className='details-modal-back-button' onClick={closeModal}>
                            <img 
                                src={ArrowLeftIcon} 
                                alt='back button icon'
                                className='back-button-icon'
                            />
                        </button>
                    </div>
                    <img
                        alt={`${pokemonDetails.name} image`}
                        src={pokemonDetails.sprite}
                        className='details-modal-sprite'
                    />
                </div>
                <div className='details-modal-content'>
                    <h2 className='modal-pokemon-name'>{pokemonDetails.name}</h2>
                    <div className='detail-types-row'>
                        {pokemonDetails.types.map((value, index) =>
                            <div 
                                className='detail-type'
                                style={{
                                    marginRight: (index+1) < pokemonDetails.types.length? '5%' : '0%'
                                }}
                                key={`${index}-${value}`}
                            >{value}</div>
                        )}
                    </div>
                    <div className='tab-content' style={{
                        height: 
                            currentTab === 'similar'? '70%' :
                            currentTab === 'stats' || pokemonDetails.about.abilities.length > 2
                            ? '67%' : '57%',
                    }}>
                        <div className='tab-title-container'>
                            <h2 className='tab-title'>{currentTab}</h2>
                        </div>
                        {currentTab === 'about'
                             ? <AboutTab {...pokemonDetails.about} />
                             : currentTab === 'stats'
                             ? <StatsTab {...pokemonDetails.stats} />
                             : <SimilarTab similarPokemon={pokemonDetails.similar}/>
                        }
                    </div>
                </div>
                <div className='details-modal-footer'>
                    <div className='tab-nav-container'>
                        {TAB_NAV_DATA.map((tab, index) => 
                            <button 
                                className='modal-tab-button'
                                style={{
                                    backgroundColor: tab === currentTab? 'white' : 'transparent',
                                    boxShadow: tab === currentTab? '0px 4px 4px 0px #0000000D' : 'none',
                                }}
                                onClick={() => setCurrentTab(tab)}
                                key={`${index}-${tab}`}
                            >{tab}</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
