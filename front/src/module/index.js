import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import test from './test';

const rootReducer = combineReducers({
    test,
    pender: penderReducer,
});

export default rootReducer;
