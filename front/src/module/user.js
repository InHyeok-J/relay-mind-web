import { createAction, handleActions } from 'redux-actions';
import * as userApi from '../api/userApi';
import { pender } from 'redux-pender';

const INIT_USER = 'user/INIT_USER';
const INIT_SIGNUP = 'user/INIT_SIGNUP';
const SIGNUP = 'user/SIGNUP';
const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';
const GET_USER = 'user/GET_USER';

export const signUpAction = createAction(SIGNUP, userApi.signUp);
export const signUpCleanAction = createAction(INIT_SIGNUP);
export const loginAction = createAction(LOGIN, userApi.login);
export const logoutAction = createAction(LOGOUT, userApi.logout);
export const userCleanAction = createAction(INIT_USER);
export const getUserAction = createAction(GET_USER, userApi.getUser);

const initialState = {
    signup: null,
    logout: null,
    user: null,
    data: null,
    error: null,
};

export default handleActions(
    {
        [INIT_SIGNUP]: (state) => ({
            ...state,
            signup: initialState.signup,
        }),
        [INIT_USER]: (state) => ({
            ...state,
            user: initialState.user,
        }),
        ...pender({
            type: SIGNUP,
            onSuccess: (state, { payload }) => ({
                ...state,
                signup: payload,
            }),
            onFailure: (state, { payload }) => ({
                ...state,
                error: payload,
            }),
        }),
        ...pender({
            type: LOGIN,
            onPending: (state, action) => {
                console.log(action);
            },
            onSuccess: (state, action) => {
                return {
                    ...state,
                    user: action.payload,
                };
            },
            onFailure: (state, { payload }) => ({
                ...state,
                error: payload,
            }),
        }),
        ...pender({
            type: LOGOUT,
            onSuccess: (state, { payload }) => ({
                ...state,
                user: null,
            }),
        }),
        ...pender({
            type: GET_USER,
            onSuccess: (state, { payload }) => ({
                ...state,
                user: payload,
            }),
            onFailure: (state, { payload }) => ({
                ...state,
                error: payload,
                user: null,
            }),
        }),
    },
    initialState,
);
