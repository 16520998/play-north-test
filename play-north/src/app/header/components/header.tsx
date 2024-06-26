'use client';

import headerStyle from './header.module.sass';

import Menu from "@/app/interfaces/menu";
import {useRouter} from "next/router";

interface link {
    name: string,
    href: string,
    lobby: string
}

const Header = ({menu}: { menu: Menu }) => {
    const router = useRouter();
    const { lobby } = router.query;
    const links = [
        {
            name: 'Lobby',
            href: menu?.lobby?.items[menu.lobby.items.length - 1].path,
            value: 'lobby',
            lobby: 'casino'
        },
        {
            name: 'Live Lobby',
            href: menu?.liveLobby?.items[0].path,
            value: 'liveLobby',
            lobby: 'live-casino'
        }
    ]

    const goToLobbyPage = (menu, link) => {
        router.push(link.href);
    }

    const goToHomePage = () => {
        router.push('/');
    }

    const lobbyTypes = buildLobbyTypes(menu, links, lobby, goToLobbyPage);

    return (
        <div className={headerStyle['header']}>
            <div className={headerStyle['header-company-name-and-lobby-types']}>
                <div className={headerStyle['header-logo']} onClick={goToHomePage}>
                    <h3 className={headerStyle['company-name']}>PLAY NORTH</h3>
                </div>

                {lobbyTypes}
            </div>
        </div>
    )
}

const buildLobbyTypes = (
    menu: Menu,
    links: link[],
    lobby: string | string[],
    goToLobbyPage: (menu: Menu, link: link) => void
) => {
    return links.map((link) =>
        <div
            onClick={() => goToLobbyPage(menu, link)}
            key={link.name}
            className={lobby === link.lobby ? headerStyle['selected-lobby-type'] : headerStyle['lobby-type']}
        >
            {link.name}
        </div>
    )
}

export default Header;