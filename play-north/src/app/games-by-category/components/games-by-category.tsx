'use client';

import {useEffect, useState} from "react";
import gameByCategoryStyle from './games-by-category.module.sass';

import GameCard from "@/app/games-by-category/game-card/components/game-card";
import Game from "@/app/games-by-category/game-card/intefaces/game";
import {findGamesByCategory} from "@/app/games-by-category/apis/find-game-by-category";
import GameCollectionNavigation from "@/app/games-by-category/game-collection-navigation/game-collection-navigation";
import GameFindByCategory from "@/app/games-by-category/interfaces/game-find-by-category";
import loadingOverlayUtil from "@/redux/utils/loading-overlay-util";
import EmptyData from "@/app/common-ui/empty-data/empty-data";
import {findGamesByText} from "@/app/header/games-search/apis/find-games-by-text";

const GamesByCategory = ({category, defaultGameData, searchText}: {
    category: string,
    defaultGameData: GameFindByCategory,
    searchText: string
}) => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(12);
    const {showLoading, hideLoading} = loadingOverlayUtil();

    const [gameCollections, setGameCollections] = useState<{
        games: Game[],
        nextPageUri: string,
        prevPageUri: string,
    }>({
            games: defaultGameData.games,
            nextPageUri: defaultGameData.nextPageUri,
            prevPageUri: defaultGameData.prevPageUri
        }
    )

    const getListGames = async (category: string, pageNumber: number, pageSize: number) => {
        showLoading();
        const listGame = await findGamesByCategory(category, pageNumber, pageSize)

        hideLoading();

        setGameCollections({
                games: listGame.items,
                nextPageUri: listGame.nextPage,
                prevPageUri: listGame.previousPage
            }
        );
    };

    const getListGamesSearch = async (searchText: string, pageNumber: number, pageSize: number) => {
        showLoading();
        const listGame = await findGamesByText(searchText, pageNumber, pageSize);
        hideLoading();
        setGameCollections(serializeListGame(listGame));
    };

    const {games, nextPageUri, prevPageUri} = gameCollections;

    const gameCollectionNavigation = games?.length > 0 ?
        <GameCollectionNavigation
            searchText={searchText}
            category={category}
            getListGame={getListGames}
            getListGamesSearch={getListGamesSearch}
            nextPageApiUri={nextPageUri}
            pageNumber={pageNumber}
            pageSize={pageSize}
            prevPageApiUri={prevPageUri}
            setPageNumber={setPageNumber}
            setPageSize={setPageSize}/>
        : <></>;

    useEffect(() => {
        setGameCollections(defaultGameData);
        setPageNumber(1);
        setPageSize(12);
    }, [defaultGameData])


    const gamesCard = getGamesCard(games);
    const gamesCardClasses = getGamesCardClasses(games);

    return (
        <div className={gameByCategoryStyle.gamesByCategory}>
            <div className={gameByCategoryStyle.gamesByCategoryContent}>
                <div className={gamesCardClasses}>
                    {gamesCard}
                </div>

                {gameCollectionNavigation}
            </div>
        </div>
    );
}

const getGamesCardClasses = (games: Game[]) => games?.length > 0
    ? gameByCategoryStyle.gamesByCategoryContentCollections
    : 'no-data';

const getGamesCard = (games: Game[]) => {
    return games?.length > 0
        ? games.map((game: Game) => <GameCard key={game.id} game={game}/>)
        : <EmptyData/>;
}

//TODO:move this to util
const serializeListGame = (listGame) => {
    return {
        games: listGame.items,
        nextPageUri: listGame.nextPage,
        prevPageUri: listGame.previousPage
    }
}

export default GamesByCategory;