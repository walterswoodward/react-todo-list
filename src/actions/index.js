export const GET_TODOS = 'GET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';

import http from "../services/api";

export const deleteTodo = (id) => dispatch => {
    http.delete('/todo/' + id)
    .then(function (response) {
        dispatch({ type: DELETE_TODO, payload: {...response.data, id: id}});
    })
    .catch(function (error) {
        console.log(error);
        return error;
    })
}

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
