import { ADD_TODO, GET_TODOS } from "../actions";

const initialState = {
    todos: [],
    error: "none"
};

export const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TODOS:
            return { ...state, todos: action.payload };
        case ADD_TODO:
            let copy = state.todos.slice();
            copy.push(action.payload);
            return { ...state, todos: copy};
        default:
            return state;
    }
};
