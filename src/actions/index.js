export const GET_TODOS = 'GET_TODOS';
export const GET_COMPLETED = 'GET_COMPLETED';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const UPDATE_COMPLETED = 'UPDATE_COMPLETED';
export const DELETE_COMPLETED = 'DELETE_COMPLETED';
export const RESTORE_TODO = 'RESTORE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const REDIRECT = 'REDIRECT';
export const TOGGLE_EDITING = 'TOGGLE_EDITING';

import http from "../services/api";

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

export const getCompleted = () => dispatch => {
    http.get('/complete')
    .then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.log(error);
        return error;
    }).then((results) => {
        dispatch({ type: GET_COMPLETED, payload: results });
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

export const restoreTodo = (completed, id) => dispatch => {
    http.post('/todo/' + id + '?completed='+encodeURIComponent(completed))
    .then(function (response) {
        dispatch({ type: RESTORE_TODO, payload: {...response.data, id: id, completed: completed}});
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

export const deleteCompleted = (id) => dispatch => {
    http.delete('/todo/' + id)
    .then(function (response) {
        dispatch({ type: DELETE_COMPLETED, payload: {...response.data, id: id}});
    })
    .catch(function (error) {
        console.log(error);
        return error;
    })
}

export const toggleEditing = (todo) => dispatch => {
    dispatch({ type: TOGGLE_EDITING, payload: {todo: todo} });
}

// Note: This allows for redirects to be applied after actions
// currently there is no need for it, but I'm leaving it in, in
// case future additions merit its use - so far I've found that
// this can mostly be avoided by creating self contained routes
// that do not redirects.
// Example:
// 1. Apply the redirect on source route
// 2. Add this to componentDidMount of target route:
// if(this.props.history.location.pathname == this.props.redirect) {this.props.redirect('');};
export const redirect = (url) => dispatch => {
    dispatch({ type: REDIRECT, payload: {redirect: url} });
};