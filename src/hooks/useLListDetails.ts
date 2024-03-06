import { useEffect, useState } from "react";

interface ListItemInterface{
    name: string;
    url: string;
}

export function useListDetails(
    limit: number,
    offset: number,
    searchTerm?: string,
):{
    searchValue: string;
    search: (value: string) => void;
    pokemonList: ListItemInterface[];
}{
    const [searchValue, setSearchValue] = useState(searchTerm || '');
    const [pokemonList, setPokemonList] = useState<ListItemInterface[]>([]);

    function search(value: string){
        setSearchValue(value);
    } 

    async function getPokemonList(){
        let tempList: ListItemInterface[] = [];

        if(searchValue){
            const pokeApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${1302}`);

            if(pokeApiResponse && pokeApiResponse.ok && pokeApiResponse.status === 200){
                const pokeApiResponseBody = await pokeApiResponse.json();
                const responseList: ListItemInterface[] = pokeApiResponseBody.results;

                tempList = responseList.filter((value) => 
                    value.name.toLowerCase().includes(searchValue.toLowerCase())
                    ||
                    searchValue.toLowerCase().includes(value.name.toLowerCase())
                );
            }
        }else{
            const pokeApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);

            if(pokeApiResponse && pokeApiResponse.ok && pokeApiResponse.status === 200){
                const pokeApiResponseBody = await pokeApiResponse.json();
                tempList = pokeApiResponseBody.results;
            }
        }

        setPokemonList(tempList);
    }

    useEffect(() => {
        getPokemonList().then(() => {});
    },[searchValue]);

    return{
        searchValue,
        search,
        pokemonList,
    }
}