import {
    GET_TODOS,
    ADD_TODO,
    DELETE_TODO
} from "../actions";

const initialState = {
    todos: [],
    error: null
};

function insertItem(array, item) {
    let copy = array.slice();
    copy.push(item);
    return copy;
}
  
function removeItem(array, id) {
    let copy = array.slice();
    return copy.filter((todo, index) => {
        return copy[index].Id != id;
    });
}

export const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TODOS:
            return { ...state, todos: action.payload };
        case ADD_TODO:
            return { ...state, todos: insertItem(state.todos, action.payload)};
        case DELETE_TODO:
            return { ...state, todos: removeItem(state.todos, action.payload.id)};
        default:
            return state;
    }
};
