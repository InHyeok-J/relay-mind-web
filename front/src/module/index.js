import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import test from './test';
import user from './user';
import game from './game';

const rootReducer = combineReducers({
    test,
    user,
    game,
    pender: penderReducer,
});

export default rootReducer;
