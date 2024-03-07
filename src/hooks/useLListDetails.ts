import { useEffect, useState } from "react";
import { NavigateFunction } from "react-router-dom";

export type PageLimitType = 8 | 12 | 16 | 24;

interface ListItemInterface{
    name: string;
    url: string;
}

export function useListDetails(
    navigate: NavigateFunction,
    searchTerm?: string,
):{
    searchValue: string;
    search: (value: string) => void;
    pokemonList: ListItemInterface[];
    currentPage: number;
    pageCount: number;
    nextPage: () => void;
    previousPage: () => void;
    gotoPage: (page: number) => void;
    pageLimit: PageLimitType;
    changePageLimit: (newLimit: PageLimitType) => void;
}{
    const [searchValue, setSearchValue] = useState(searchTerm || '');
    const [pokemonList, setPokemonList] = useState<ListItemInterface[]>([]);

    const [pageLimit, setPageLimit] = useState<PageLimitType>(8);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    function nextPage(){
        if(currentPage < pageCount){
            setCurrentPage(currentPage+1);
        }
    }

    function previousPage(){
        if(currentPage > 1){
            setCurrentPage(currentPage-1);
        }
    }

    function gotoPage(pageNumber: number){
        if(pageNumber > 0 && pageNumber < (pageCount+1)){
            setCurrentPage(pageNumber);
        }
    }

    function changePageLimit(newPageLimit: PageLimitType){
        setPageLimit(newPageLimit);
        setCurrentPage(1);
    }

    function search(value: string){
        setSearchValue(value);
        if(!value){
            navigate('/list');
        }
    } 

    async function getPokemonList(){
        let tempList: ListItemInterface[] = [];

        const pokeApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302`);

        if(pokeApiResponse && pokeApiResponse.ok && pokeApiResponse.status === 200){
            const pokeApiResponseBody = await pokeApiResponse.json();
            const responseList: ListItemInterface[] = pokeApiResponseBody.results;

            if(searchValue){
                tempList = responseList.filter((value) => 
                    value.name.toLowerCase().includes(searchValue.toLowerCase())
                    ||
                    searchValue.toLowerCase().includes(value.name.toLowerCase())
                );
            }else{
                tempList = responseList;
            }
        }

        setPokemonList(tempList.slice(
            (currentPage*pageLimit) - pageLimit, 
            (currentPage*pageLimit) <= (tempList.length)? (currentPage*pageLimit) : tempList.length 
        ));
        setPageCount(Math.ceil(tempList.length/pageLimit));
    }

    useEffect(() => {
        getPokemonList().then(() => {});
    },[searchValue, currentPage, pageLimit]);

    return{
        searchValue,
        search,
        pokemonList,
        currentPage,
        pageCount,
        nextPage,
        previousPage,
        gotoPage,
        pageLimit,
        changePageLimit,
    }
}