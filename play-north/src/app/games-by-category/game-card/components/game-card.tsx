'use client';

import Game from "@/app/games-by-category/game-card/intefaces/game";
import gameCardStyle from './game-card.module.sass';

const GameCard = ({game}: { game: Game }) => {
    return (
        <div className={gameCardStyle.gameCard}>
            <div className={gameCardStyle.gameCardCoverImage}>
                <img src={game.image.original.src} alt={game.image.alt}/>
            </div>

            <div className={gameCardStyle.gameCardContent}>
                <span className={gameCardStyle.gameCardContentText}>
                    {game.gameText} - {game.provider}
                </span>
            </div>
        </div>
    )
}

export default GameCard;