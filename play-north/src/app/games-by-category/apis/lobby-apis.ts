'use server';

import axios from "axios";
import LobbyCategory from "@/app/games-by-category/interfaces/lobby-category";

const API_URI = process.env.NEXT_PUBLIC_API_URI;

const api = axios.create({
  baseURL: API_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getGameConfig = async () => {
  try {
    const response = await api.get('/en/config')
    return response.data;
  } catch (error) {
    console.log('error find games by category');
  }
}

export const getMenuGame = async () => {
  const data = await getGameConfig();

  return data.menu;
}

export const getLobbyCategories = async () => {
  const data = await getGameConfig();

  return serializeLobbyCategories(data.menu.lobby.items);
  // return data.menu.lobby.items;
}

const serializeLobbyCategories = (lobbyCategories: LobbyCategory[]) => {
  return lobbyCategories.filter((lobbyCategory) => lobbyCategory.name !== 'Lobby');
}

export const getLiveLobbyCategories = async () => {
  const data = await getGameConfig();

  return data.menu.liveLobby.items;
}
