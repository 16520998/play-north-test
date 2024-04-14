interface Game {
    id: string;
    gameText: string;
    provider: string;
    image: {
        alt: string;
        original: {
            src: string;
        };
    };
}

export default Game;