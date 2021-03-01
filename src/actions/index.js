export const GET_ALL = 'GET_ALL';
export const ADD_TODO = 'ADD_TODO';
export const GET_TODOS = 'GET_TODOS';
export const TOGGLE_FETCHING = 'TOGGLE_FETCHING';

import http from "../services/api";

export const addTodo = (description) => dispatch => {
    http.post('/todo?description='+encodeURIComponent(description))
    .then(function (response) {
        dispatch({ type: ADD_TODO, payload: response.data });
    })
    .catch(function (error) {
        console.log(error);
        return error;
    })
};

export const getTodos = () => dispatch => {
    http.get('/all')
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.log(error);
            return error;
        }).then((results) => {
            dispatch({ type: GET_TODOS, payload: results });
        });
};

export const toggleFetching = () => dispatch => {
    dispatch({type: TOGGLE_FETCHING})
}
