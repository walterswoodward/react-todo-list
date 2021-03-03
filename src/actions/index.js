export const GET_TODOS = 'GET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const UPDATE_COMPLETED = 'UPDATE_COMPLETED';
export const DELETE_TODO = 'DELETE_TODO';
export const REDIRECT = 'REDIRECT';
export const TOGGLE_EDITING = 'TOGGLE_EDITING';

import http from "../services/api";

export const redirect = (url) => dispatch => {
    dispatch({ type: REDIRECT, payload: {redirect: url} });
};

export const getTodos = () => dispatch => {
    http.get('/incomplete')
    .then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.log(error);
        return error;
    }).then((results) => {
        dispatch({ type: GET_TODOS, payload: results });
    });
};

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

export const updateTodo = (description, id) => dispatch => {
    http.post('/todo/' + id + '?description='+encodeURIComponent(description))
    .then(function (response) {
        dispatch({ type: UPDATE_TODO, payload: {...response.data, id: id, description: description}});
    })
    .catch(function (error) {
        console.log(error);
        return error;
    })
};

export const updateCompleted = (completed, id) => dispatch => {
    http.post('/todo/' + id + '?completed='+encodeURIComponent(completed))
    .then(function (response) {
        dispatch({ type: UPDATE_COMPLETED, payload: {...response.data, id: id, completed: completed}});
    })
    .catch(function (error) {
        console.log(error);
        return error;
    })
};

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

export const toggleEditing = (todo) => dispatch => {
    dispatch({ type: TOGGLE_EDITING, payload: {todo: todo} });
}
