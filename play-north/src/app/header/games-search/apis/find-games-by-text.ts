import axios from "axios";

const API_URI = process.env.NEXT_PUBLIC_API_URI;

const api = axios.create({
    baseURL: API_URI,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const findGamesByText = async (searchText: string, pageNumber:number, pageSize:number) => {
    try {
        const params = new URLSearchParams({
            search: searchText,
            pageNumber,
            pageSize,
        });

        const response = await api.get('/en/games/tiles' + '?' + params)

        return response.data;
    } catch (error) {
        console.log('error find games by text');
    }
}