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
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    storage
}

const persisted = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persisted,
    composeEnhancers(applyMiddleware(penderMiddleware(), logger)),
);

const persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
      </PersistGate>
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();
