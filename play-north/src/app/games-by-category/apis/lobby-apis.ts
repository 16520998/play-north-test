'use server';

import axios from "axios";

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

  return data.menu.lobby.items;
}

export const getLiveLobbyCategories = async () => {
  const data = await getGameConfig();

  return data.menu.liveLobby.items;
}
