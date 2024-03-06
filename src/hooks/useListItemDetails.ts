import { useEffect, useState } from "react";
import { POKEMON_TYPE_STRINGS } from "./PokemonTypeStrings";

interface PokemonTypeInterface{
    slot: number;
    type: {
        name: string;
        url: string;
    }
}

interface PokemonDetailsInterface{
    id: number;
    name: string;
    sprite: string;
    cry: string;
    types: string[];
}

export function useListItemDetails(
    pokemonUrl: string
):{
    pokemonDetails: PokemonDetailsInterface;
}{
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailsInterface>({} as PokemonDetailsInterface);

    async function getPokemonDetails(){
        let tempDetails: PokemonDetailsInterface = {} as PokemonDetailsInterface;

        const pokeApiResponse = await fetch(pokemonUrl);

        if(pokeApiResponse && pokeApiResponse.ok && pokeApiResponse.status === 200){
            const pokeApiResponseBody = await pokeApiResponse.json();

            const pokemonTypes = pokeApiResponseBody.types.map((pokeType: PokemonTypeInterface) => 
                POKEMON_TYPE_STRINGS[pokeType.type.name]
            );

            tempDetails = {
                id: pokeApiResponseBody.id,
                name: pokeApiResponseBody.name,
                sprite: pokeApiResponseBody.sprites.other['dream_world'].front_default 
                    || pokeApiResponseBody.sprites.other['official-artwork'].front_default,
                cry: pokeApiResponseBody.cries.latest,
                types: pokemonTypes,
            };
            // console.log({tempDetails, pokeApiResponseBody});
        }

        setPokemonDetails(tempDetails);
    }

    async function getAllPokemonTypes(){ // function to get all pokemon types to help create PokemonTypeStrings object with emojis
        const pokeApiResponse = await fetch('https://pokeapi.co/api/v2/type/');                                                                     
        if(pokeApiResponse && pokeApiResponse.ok && pokeApiResponse.status === 200){
            const pokeApiResponseBody = await pokeApiResponse.json();

            const pokemonTypes = pokeApiResponseBody.results.map((result: any) => result.name);
            // console.log('All pokemon types: ', pokemonTypes);
        }
    }

    useEffect(() => {
        getPokemonDetails().then(() => {});
        getAllPokemonTypes().then(() => {});
    },[]);

    return{
        pokemonDetails,
    }
}