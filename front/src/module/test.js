import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from "axios";

const TEST_DATA = 'user/TEST_DATA';

const axiosFunction = async () => {
    console.log("qwer")
    const res = await axios.get('http://localhost:3001/memo2');
    return res.data;
}

export const testDataAction = createAction(TEST_DATA, axiosFunction);

const initialState = {
    test : null,
    error : null
};

export default handleActions(
    {
      ...pender({
          type: TEST_DATA,
          onSuccess: (state, {payload}) => ({
              ...state,
              test: payload
          }),
          onFailure: (state, {payload}) => ({
              ...state,
              error: payload
          })
      })
    },
    initialState,
);
