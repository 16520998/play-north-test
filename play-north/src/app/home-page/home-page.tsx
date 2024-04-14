'use client';

import homePageStyle from './home-page.module.sass';

import GamesByCategory from "@/app/games-by-category/components/games-by-category";
import GameSearch from "@/app/header/games-search/game-search";
import GameFindByCategory from "@/app/games-by-category/interfaces/game-find-by-category";
import {useState} from "react";

const HomePage = ({category, defaultGameData}: {
    category: string,
    defaultGameData: GameFindByCategory
}) => {
    const [games, setGames] = useState<GameFindByCategory>({
        games: defaultGameData.games,
        nextPageUri: defaultGameData.nextPageUri,
        prevPageUri: defaultGameData.prevPageUri,
    });

    const [searchText, setSearchText] = useState('');

    const onSearch = (result : GameFindByCategory, searchText: string = '') => {
        setGames(result);
        setSearchText(searchText);
    }

    return (
        <div className={homePageStyle.container}>
            <GameSearch onSearch={onSearch} ></GameSearch>

            <GamesByCategory
                searchText={searchText}
                category={category}
                defaultGameData={games}>
            </GamesByCategory>
        </div>
    );
};


export default HomePage;