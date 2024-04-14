import {getLiveLobbyCategories, getLobbyCategories} from "@/app/games-by-category/apis/lobby-apis";
import LobbyCategoriesNavigation from "@/app/header/lobby-categories-navigation/lobby-categories-navigation";
import LobbyCategory from "@/app/games-by-category/interfaces/lobby-category";
import React from "react";

const Lobby = ({lobbyCategories, children}: { lobbyCategories: LobbyCategory[], children: React.ReactNode }) => {
    return (
        <div>
            <LobbyCategoriesNavigation lobbyCategories={lobbyCategories}/>

            {children}
        </div>
    )
}


export async function getServerSideProps({params}) {
    let lobbyCategories = [];

    const {lobby} = params;
    console.log('lobby', lobby);
    if (lobby === 'casino') {
        lobbyCategories = await getLobbyCategories();
    } else if (lobby === 'live-casino') {
        lobbyCategories = await getLiveLobbyCategories();
    }

    return {
        props: {
            lobbyCategories,
        },
    };
}

export default Lobby;