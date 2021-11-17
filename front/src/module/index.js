import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import test from './test';
import user from './user';

const rootReducer = combineReducers({
    test,
    user,
    pender: penderReducer,
});

export default rootReducer;
