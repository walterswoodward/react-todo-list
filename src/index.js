import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Reducer } from './reducers'
import logger from 'redux-logger';

// TODO: Move this to a separate file src/store.js
// const store = createStore(Reducer, applyMiddleware(thunk));

// Redux DevTools (https://github.com/zalmoxisus/redux-devtools-extension):
const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
const store = createStore(Reducer, composeEnhancers(applyMiddleware(thunk, logger)));

import TodosList from './components/TodosList'

// Remove console log in production mode
if (process.env.NODE_ENV === "production") {
    console.log = function(){}; 
}

ReactDOM.render(
    <Provider store={store}>
        <TodosList />
    </Provider>,
    document.getElementById('root')
)
