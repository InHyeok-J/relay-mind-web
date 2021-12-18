import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import test from './test';
import user from './user';
import game from './game';
import socket from './socket';

const rootReducer = combineReducers({
    test,
    user,
    game,
    socket,
    pender: penderReducer,
});

export default rootReducer;
