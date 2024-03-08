import { useEffect, useState } from "react";
import { POKEMON_TYPE_STRINGS } from "./PokemonTypeStrings";

interface PokemonTypeInterface{
    slot: number;
    type: {
        name: string;
        url: string;
    }
}

export interface PokemonDetailsInterface{
    id: number;
    name: string;
    sprite: string;
    types: string[];
    cry: string;
    about: {
        height: number;
        weight: number;
        abilities: string[];
    }
    stats: {
        hp: number;
        attack: number;
        defense: number;
        special_attack: number;
        special_defense: number;
        speed: number;
    }
    similar: {
        name: string;
        url: string;
    }[];
}

export function useListItemDetails(
    pokemonUrl: string
):{
    pokemonDetails: PokemonDetailsInterface;
}{
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailsInterface>({} as PokemonDetailsInterface);

    async function getSimilarPokemon(pokemonName: string, pokemonTypes: string[]){
        let similarPokemon: {name: string, url: string}[] = [];

        if(pokemonTypes.length === 1){
            const pokeApiResponse = await fetch(`https://pokeapi.co/api/v2/type/${pokemonTypes[0]}/`);
            const pokeApiResponseBody = await pokeApiResponse.json();

            // console.log(`=========================${pokemonName}=======================`);

            const pokemonList = pokeApiResponseBody.pokemon.filter((currentPokemon: any) => 
                currentPokemon.pokemon.name !== pokemonName
            ).slice(0,2);
            // console.log({pokemonList});
            similarPokemon = pokemonList.map((currentPokemon: any) => currentPokemon.pokemon);
        }else{
            const [pokeTypeResponse1, pokeTypeResponse2] = await Promise.all([
                fetch(`https://pokeapi.co/api/v2/type/${pokemonTypes[0]}/`),
                fetch(`https://pokeapi.co/api/v2/type/${pokemonTypes[1]}/`)
            ]);
            const [pokeTypeResponseBody1, pokeTypeResponseBody2] = await Promise.all([
                pokeTypeResponse1.json(), pokeTypeResponse2.json()
            ]);

            // console.log(`=========================${pokemonName}=======================`);

            const pokemonList1 = pokeTypeResponseBody1.pokemon;
            const pokemonList2 = pokeTypeResponseBody2.pokemon;
            // console.log({pokemonList1, pokemonList2});

            const commonPokemon = pokemonList1.filter((pokemon1: any) => 
                pokemonList2.some((pokemon2: any) => pokemon1.pokemon.name === pokemon2.pokemon.name
            ));
            // console.log({commonPokemon});

            const filteredList = commonPokemon.filter((currentPokemon: any) => 
                currentPokemon.pokemon.name !== pokemonName
            ).slice(0,2);
            // console.log({filteredList});

            similarPokemon = filteredList.map((currentPokemon: any) => currentPokemon.pokemon);
        }

        return similarPokemon;
    }

    async function getPokemonDetails(){
        let tempDetails: PokemonDetailsInterface = {} as PokemonDetailsInterface;

        const pokeApiResponse = await fetch(pokemonUrl);

        if(pokeApiResponse && pokeApiResponse.ok && pokeApiResponse.status === 200){
            const pokeApiResponseBody = await pokeApiResponse.json();

            const pokemonTypes = pokeApiResponseBody.types.map((pokeType: PokemonTypeInterface) => 
                POKEMON_TYPE_STRINGS[pokeType.type.name]
            );

            let tempStats: any = {};
            pokeApiResponseBody.stats.forEach((pokeStat: any) => tempStats[String(pokeStat.stat.name).replace('-','_')] = pokeStat.base_stat);

            const similarPokemon = await getSimilarPokemon(pokeApiResponseBody.name,
                pokeApiResponseBody.types.map((pokeType: PokemonTypeInterface) => 
                    pokeType.type.name
                ));

            // console.log({similarPokemon});

            tempDetails = {
                id: pokeApiResponseBody.id,
                name: pokeApiResponseBody.name,
                sprite: pokeApiResponseBody.sprites.other['dream_world'].front_default 
                    || pokeApiResponseBody.sprites.other['official-artwork'].front_default,
                cry: pokeApiResponseBody.cries.latest || '',
                types: pokemonTypes,
                about: {
                    height: pokeApiResponseBody.height,
                    weight: pokeApiResponseBody.weight,
                    abilities: pokeApiResponseBody.abilities.map((ability: any) => ability.ability.name)
                },
                stats: tempStats,
                similar: similarPokemon,
            };

            // console.log({tempDetails, pokeApiResponseBody});
            // console.log('======================================');
        }

        setPokemonDetails(tempDetails);
    }

    async function getAllPokemonTypes(){ // function to get all pokemon types to help create PokemonTypeStrings object with emojis
        const pokeApiResponse = await fetch('https://pokeapi.co/api/v2/type/');                                                                     
        if(pokeApiResponse && pokeApiResponse.ok && pokeApiResponse.status === 200){
            const pokeApiResponseBody = await pokeApiResponse.json();

            const pokemonTypes = pokeApiResponseBody.results.map((result: any) => result.name);
            console.log('All pokemon types: ', pokemonTypes);
        }
    }

    useEffect(() => {
        getPokemonDetails().then(() => {});
        // getAllPokemonTypes().then(() => {});
    },[]);

    return{
        pokemonDetails,
    }
}