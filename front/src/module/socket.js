import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import SocketClient from 'socket.io-client';
const SET_SOCKET = 'socket/SET_SOCKET';

export const setSocketAction = createAction(SET_SOCKET, async () => {
    let io = await SocketClient('/relayMind', {
        transports: ['websocket'],
    });
    await setTimeout(0);
    return io;
});

const initialState = {
    socket: null,
    error: null,
};

export default handleActions(
    {
        ...pender({
            type: SET_SOCKET,
            onSuccess: (state, { payload }) => ({
                ...state,
                socket: payload,
            }),
            onFailure: (state, { payload }) => ({
                ...state,
                error: payload,
            }),
        }),
    },
    initialState,
);
