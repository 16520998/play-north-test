import HomePage from "@/app/home-page/home-page";
import {findGamesByCategory} from "@/app/games-by-category/apis/find-game-by-category";

const getDefaultGameData = async (category: string) => {
    const games = await findGamesByCategory(category, 1, 12);

    return {
        nextPageUri: games.nextPage,
        prevPageUri: games.previousPage ?? '',
        games: games.items,
    };
};

const Home = ({defaultGameData}) => {
    return (
        <div>
            <HomePage category='all-games' defaultGameData={defaultGameData}></HomePage>
        </div>
    );
}

export async function getServerSideProps() {
    const defaultGameData = await getDefaultGameData('all-games');

    return {
        props: {
            defaultGameData,
        },
    };
}

export default Home;

