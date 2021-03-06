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

export const getGameInfo = async (id) => {
    const response = await axios.get(`/api/game/${id}`);
    return response.data.data;
};

export const gameStart = async (data) => {
    const response = await axios.post('/api/game/start', data);
    return response.data.data;
};

export const sendKeyword = async (data) => {
    const response = await axios.post('/api/game/keyword', data);
    console.log(response);
    console.log(response.data);
    return response.data;
};

export const drawAndkeyword = async (data) => {
    console.log(data);
    const response = await axios.post('/api/game/keyword/draw', data);
    return response.data;
};
