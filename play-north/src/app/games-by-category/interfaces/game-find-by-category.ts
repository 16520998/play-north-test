import Game from "@/app/games-by-category/game-card/intefaces/game";

interface GameFindByCategory {
    nextPageUri: string,
    prevPageUri: string,
    games: Game[],
}

export default GameFindByCategory;