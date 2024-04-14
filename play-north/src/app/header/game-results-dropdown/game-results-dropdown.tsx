import React from 'react';

import gameResultsDropDownStyle from './game-results-dropdown.module.sass';

import './game-results-dropdown.module.sass';
import Game from "@/app/games-by-category/game-card/intefaces/game";

const GameResultsDropdown: React.FC<{ game: Game }> = ({ game }) => {
    return (
        <div className={gameResultsDropDownStyle['games-result-dropdown']}>
            <div className={gameResultsDropDownStyle['games-result-dropdown--cover-image']}>
                <img src={game.image.original.src}></img>
            </div>

            <div className={gameResultsDropDownStyle['games-result-dropdown--general-information']}>
                <span className={gameResultsDropDownStyle['games-result-dropdown--general-information_text']}>
                    {game.gameText} - {game.provider}
                </span>
            </div>
        </div>
    );
};

export default GameResultsDropdown;