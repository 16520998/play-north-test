import lobbyNavigationStyle from './lobby-categories-navigation.module.sass';
import LobbyCategory from "@/app/games-by-category/interfaces/lobby-category";
import {useRouter} from "next/router";

const LobbyCategoriesNavigation = ({lobbyCategories}: { lobbyCategories: LobbyCategory[] }) => {
    const router = useRouter();
    const pathName = typeof window !== 'undefined' ? window.location.pathname : '';
    const selectCategoty = (lobbyCategory: LobbyCategory) => {
        router.push(lobbyCategory.path);
    }

    const lobbyCategoriesContent = buildLobbyCategoryContent(lobbyCategories, pathName, selectCategoty);

    return (
        <div className={lobbyNavigationStyle['lobby-categories-navigation']}>
            {lobbyCategoriesContent}
        </div>
    );
}

const buildLobbyCategoryContent = (
    lobbyCategories: LobbyCategory[],
    currentPathName: string,
    selectLobbyCategory: (lobbyCategory: LobbyCategory) => void
) => {
    return lobbyCategories?.length > 0
        ? lobbyCategories.map((lobbyCategory: LobbyCategory) => {
            const lobbyCategoryClasses = currentPathName === lobbyCategory.path
                ? 'selected-lobby-category'
                : 'lobby-category'

            return (
                <div
                    className={lobbyNavigationStyle[lobbyCategoryClasses]}
                    onClick={() => selectLobbyCategory(lobbyCategory)}
                    key={lobbyCategory.id}
                >
                    {lobbyCategory.name}
                </div>)
        })
        : <></>;
}

export default LobbyCategoriesNavigation;