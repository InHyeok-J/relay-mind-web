import axios from 'axios';
axios.defaults.withCredentials = true;

export const signUp = async (data) => {
    const response = await axios.post('/api/user/signup', data);
    return response.data.data;
};

export const login = async (data) => {
    const response = await axios.post( '/api/user/login', data,{ withCredentials: true });
    console.log(response.data)
    return response.data.data;
};

export const logout = async () => {
    const response = await axios.get('/api/user/logout');
    return response.data.data;
};

export const getUser = async () => {
    const response = await axios.get('/api/user');
    return response.data.data;
};

export const getGameList = async () => {
    const response = await axios.get( '/api/game/list');
    return response.data.data;
}
