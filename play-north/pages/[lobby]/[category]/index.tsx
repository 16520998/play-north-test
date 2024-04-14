import React, {useState} from "react";

import homePageStyle from "@/app/home-page/home-page.module.sass";
import categoryPageStyle from "@/app/games-by-category/components/category.module.sass";

import GameFindByCategory from "@/app/games-by-category/interfaces/game-find-by-category";
import LobbyCategory from "@/app/games-by-category/interfaces/lobby-category";

import {findGamesByCategory} from "@/app/games-by-category/apis/find-game-by-category";
import GamesByCategory from "@/app/games-by-category/components/games-by-category";
import GameSearch from "@/app/header/games-search/game-search";
import LobbyCategoriesNavigation from "@/app/header/lobby-categories-navigation/lobby-categories-navigation";
import {getLiveLobbyCategories, getLobbyCategories} from "@/app/games-by-category/apis/lobby-apis";


const Category = (
    {
        params,
        defaultGameData,
        lobbyCategories
    }: {
        params: { category: string },
        defaultGameData: GameFindByCategory,
        lobbyCategories: LobbyCategory[]
    }) => {
    const [searchText, setSearchText] = useState('');

    const [games, setGames] = useState<GameFindByCategory>({
        games: defaultGameData.games,
        nextPageUri: defaultGameData.nextPageUri,
        prevPageUri: defaultGameData.prevPageUri,
    });

    const onSearch = (result: GameFindByCategory, searchText: string = '') => {
        setGames(result);
        setSearchText(searchText);
    }

    return (
        <div className={categoryPageStyle.container}>
            <LobbyCategoriesNavigation lobbyCategories={lobbyCategories}/>

            <div className={homePageStyle.container}>

                <GameSearch onSearch={onSearch}></GameSearch>

                <GamesByCategory category={params?.category} defaultGameData={games} searchText={searchText}/>
            </div>
        </div>
    )
}

const getDefaultGameData = async (category: string) => {
    const games = await findGamesByCategory(category, 1, 12);

    return {
        nextPageUri: games.nextPage,
        prevPageUri: games.previousPage ?? '',
        games: games.items,
    };
};

export async function getServerSideProps({params}) {
    const {category, lobby} = params;
    const defaultGameData = await getDefaultGameData(category);

    let lobbyCategories = [];

    if (lobby === 'casino') {
        lobbyCategories = await getLobbyCategories();
    } else if (lobby === 'live-casino') {
        lobbyCategories = await getLiveLobbyCategories();
    }

    return {
        props: {
            defaultGameData,
            lobbyCategories,
        },
    };
}

export default Category;