import LobbyCategory from "@/app/games-by-category/interfaces/lobby-category";
import {useRouter} from "next/router";
import {usePathname} from "next/dist/client/components/hooks-client";

const LobbyCategoriesNavigation = ({lobbyCategories}: { lobbyCategories: LobbyCategory[] }) => {
    const router = useRouter();
    const pathName = usePathname();

    const selectCategoty = (lobbyCategory: LobbyCategory) => {
        router.push(lobbyCategory.path);
    }

    const lobbyCategoriesContent = buildLobbyCategoryContent(lobbyCategories, pathName, selectCategoty);

    return (
        <div className="game-menu-lobby-categories-navigation">
            {lobbyCategoriesContent}
        </div>
    );
}

const buildLobbyCategoryContent = (
    lobbyCategories: LobbyCategory[],
    currentPathName: string,
    selectLobbyCategory: (lobbyCategory: LobbyCategory) => void
) => {
    return lobbyCategories.length > 0
        ? lobbyCategories.map((lobbyCategory: LobbyCategory) => {
            const lobbyCategoryClasses = currentPathName === lobbyCategory.path
                ? 'lobby-category selected-lobby-category'
                : 'lobby-category'
            return (<div
                className={lobbyCategoryClasses}
                onClick={() => selectLobbyCategory(lobbyCategory)}
                key={lobbyCategory.id}
            >
                {lobbyCategory.name}
            </div>)
        })
        : <></>;
}

export default LobbyCategoriesNavigation;