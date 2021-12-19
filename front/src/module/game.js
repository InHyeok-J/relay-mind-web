import { createAction, handleActions } from 'redux-actions';
import * as gameApi from '../api/gameApi';
import { pender } from 'redux-pender';

const GET_GAMELIST = 'game/GET_GAMELIST';
const INIT_GAMELIST = 'game/INIT_GAMELIST';
const CREATE_GAMEROOM = 'game/CREATE_GAMEROOM';
const CHECK_PASSWORD = 'game/CHECK_PASSWORD';
const GET_GAME_INFO = 'game/GET_GAME_INFO';
const GAME_START = 'game/GAME_START';
const POST_KEYWORD = 'game/POST_KEYWORD';
const INIT_KEYWORD = 'game/INIT_KEYWORD';
const DRAW_KEYWORD = 'game/DRAW_KEYWORD';

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
export const gameStartAction = createAction(GAME_START, gameApi.gameStart);
export const postKeywordAction = createAction(
    POST_KEYWORD,
    gameApi.sendKeyword,
);
export const initKeywordAction = createAction(INIT_KEYWORD);
export const drawKeywordAction = createAction(
    DRAW_KEYWORD,
    gameApi.drawAndkeyword,
);

const initialState = {
    data: null,
    game: null,
    start: null,
    postkeyword: null,
    drawkeyword: null,
    error: null,
};

export default handleActions(
    {
        [INIT_GAMELIST]: (state) => ({
            ...state,
            data: initialState.data,
        }),
        [INIT_KEYWORD]: (state) => ({
            ...state,
            postkeyword: null,
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
        ...pender({
            type: GAME_START,
            onSuccess: (state, { payload }) => ({
                ...state,
            }),
            onFailure: (state, { payload }) => ({
                ...state,
                error: payload,
            }),
        }),
        ...pender({
            type: POST_KEYWORD,
            onSuccess: (state, { payload }) => {
                console.log(payload);
                return {
                    ...state,
                    postkeyword: payload,
                };
            },
            onFailure: (state, { payload }) => ({
                ...state,
                error: payload,
            }),
        }),
        ...pender({
            type: DRAW_KEYWORD,
            onSuccess: (state, { payload }) => {
                console.log(payload);
                return {
                    ...state,
                    drawkeyword: payload,
                };
            },
            onFailure: (state, { payload }) => ({
                ...state,
                error: payload,
            }),
        }),
    },
    initialState,
);
