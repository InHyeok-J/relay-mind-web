import axios from 'axios';

export const getGameList = async () => {
    const response = await axios.get('/api/game/list');
    return response.data.data;
};

export const CreateGameRoom = async (data) => {
    const response = await axios.post('/api/game', data);
    return response.data.data;
};

export const gamePasswordCheck = async (data) => {
    const response = await axios.post('/api/game/check', data);
    return response.data.data;
};
