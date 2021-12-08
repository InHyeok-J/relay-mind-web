import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux';
import penderMiddleware from 'redux-pender';
import logger from 'redux-logger';
import rootReducer from './module';
import { Provider } from "react-redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(penderMiddleware(), logger)),
);

ReactDOM.render(
    <Provider store={store}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();
