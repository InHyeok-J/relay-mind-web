import axios from 'axios';

const path = "http://54.180.120.119:4000";

export const signUp = async (data) => {
    const response = await axios.post(path + '/api/user/signup', data);
    return response.data.data;
};

export const login = async (data) => {
    const response = await axios.post(path + '/api/user/login', data);
    return response.data.data;
};

export const logout = async () => {
    const response = await axios.get(path + '/api/user/logout');
    return response.data.data;
};

export const getUser = async () => {
    const response = await axios.get(path + '/api/user');
    return response.data.data;
};
