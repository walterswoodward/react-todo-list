import {
    GET_TODOS,
    ADD_TODO,
    DELETE_TODO,
    UPDATE_TODO,
    UPDATE_COMPLETED,
    REDIRECT,
    TOGGLE_EDITING
} from "../actions";

const initialState = {
    todos: [],
    error: null,
    redirect: '',
    editing: null
};

// insertTodo :: ([Model?], item) -> [ ]
// item = any valid javascript array type
function insertTodo(array, item) {
    let copy = array.slice();
    copy.push(item);
    return copy;
}

// removeTodo :: ([Model], numeric) -> [ ]
// TodoItemModel = see backend repository `todolist-mysql-go`
function removeTodo(array, id) {
    let copy = array.slice();
    return copy.filter((_value, index) => {
        return copy[index].Id != id;
    });
}

// updateTodo :: ([Model], item) -> [ ]
// TodoItemModel = see backend repository `todolist-mysql-go`
// item = any valid javascript array type
function updateTodo(array, payload) {
    let copy = array.slice();
    return copy.map((todo, index) => {
        if (todo['Id'] == payload.id) {
            todo['Description'] = payload.description;
            return todo;
        } else {
            return todo;
        }
    });
}

export const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TODOS:
            return { ...state, todos: action.payload };
        case ADD_TODO:
            return { ...state, todos: insertTodo(state.todos, action.payload)};
        case UPDATE_TODO:
            return { ...state, todos: updateTodo(state.todos, action.payload)};
        case UPDATE_COMPLETED:
            return { ...state, todos: removeTodo(state.todos, action.payload.id)};
        case DELETE_TODO:
            return { ...state, todos: removeTodo(state.todos, action.payload.id)};
        case REDIRECT:
            return {...state, redirect: action.payload.redirect};
        case TOGGLE_EDITING:
            return {...state, editing: action.payload.todo};
        default:
            return state;
    }
};
