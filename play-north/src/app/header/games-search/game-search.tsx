import React, {useState} from "react";

import gameSearchStyle from './game-search.module.sass';

import loadingOverlayUtil from "@/redux/utils/loading-overlay-util";
import GameFindByCategory from "@/app/games-by-category/interfaces/game-find-by-category";
import {findGamesByCategory} from "@/app/games-by-category/apis/find-game-by-category";
import {findGamesByText} from "@/app/header/games-search/apis/find-games-by-text";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 12;

interface GameSearchProps {
    onSearch: (result: GameFindByCategory, searchText: string) => void;
}

const GameSearch = ({onSearch}: GameSearchProps) => {
    const [searchText, setSearchText] = useState('');
    const {showLoading, hideLoading} = loadingOverlayUtil();

    const getGamesResult = async (searchText: string) => {
        showLoading();
        const listGame = await findGamesByText(searchText, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE);
        hideLoading();
        onSearch(serializeListGame(listGame), searchText);
    };

    const getListDefaultGames = async (category: string) => {
        showLoading();
        const listGame = await findGamesByCategory(category, 1, 12);

        hideLoading();
        const listGameDefault = serializeListGame(listGame)
        onSearch(listGameDefault);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setSearchText(value);

        let timeout;

        // Debounce the API call
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (value.trim() !== '') {
                getGamesResult(value);
            }
        }, 2000);
    }

    const clearSearchText = () => {
        setSearchText('');
        getListDefaultGames('all-games');
    }

    const closeButton = searchText ?
        <div className={gameSearchStyle['games-search--close-button']} onClick={clearSearchText}>x</div>
        : null

    return (
        <div className={gameSearchStyle['games-search']}>
            {closeButton}

            <input
                className={gameSearchStyle['games-search--input']}
                type="text"
                placeholder="Search Games"
                value={searchText}
                onChange={handleInputChange}/>
        </div>
    )
}

const serializeListGame = (listGame) => {
    return {
        games: listGame.items,
        nextPageUri: listGame.nextPage,
        prevPageUri: listGame.previousPage
    }
}

export default GameSearch;

