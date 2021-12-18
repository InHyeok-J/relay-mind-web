import { createAction, handleActions } from 'redux-actions';
import * as gameApi from '../api/gameApi';
import { pender } from 'redux-pender';

const GET_GAMELIST = 'game/GET_GAMELIST';
const INIT_GAMELIST = 'game/INIT_GAMELIST';
const CREATE_GAMEROOM = 'game/CREATE_GAMEROOM';
const CHECK_PASSWORD = 'game/CHECK_PASSWORD';
const GET_GAME_INFO = 'game/GET_GAME_INFO';
export const gameCleanAction = createAction(INIT_GAMELIST);
export const getGameListAction = createAction(
    GET_GAMELIST,
    gameApi.getGameList,
);
export const getGameInfoAction = createAction(
    GET_GAME_INFO,
    gameApi.getGameInfo,
);
export const CreateGameRoomAction = createAction(
    CREATE_GAMEROOM,
    gameApi.CreateGameRoom,
);
export const checkGamePasswordAction = createAction(
    CHECK_PASSWORD,
    gameApi.gamePasswordCheck,
);

const initialState = {
    data: null,
    game: null,
    error: null,
};

export default handleActions(
    {
        [INIT_GAMELIST]: (state) => ({
            ...state,
            data: initialState.data,
        }),
        ...pender({
            type: GET_GAMELIST,
            onPending: (state, action) => {
                console.log(action);
            },
            onSuccess: (state, { payload }) => ({
                ...state,
                data: payload,
            }),
            onFailure: (state, { payload }) => ({
                ...state,
                error: payload,
            }),
        }),
        ...pender({
            type: CREATE_GAMEROOM,
            onPending: (state, action) => {
                console.log(action);
            },
            onSuccess: (state, action) => {
                return {
                    ...state,
                };
            },
            onFailure: (state, { payload }) => ({
                ...state,
                error: payload,
            }),
        }),
        ...pender({
            type: CHECK_PASSWORD,
            onFailure: (state, { payload }) => ({
                ...state,
                error: payload,
            }),
        }),
        ...pender({
            type: GET_GAME_INFO,
            onSuccess: (state, { payload }) => ({
                ...state,
                game: payload,
            }),
            onFailure: (state, { payload }) => ({
                ...state,
                error: payload,
            }),
        }),
    },
    initialState,
);
