import { ADD_TODO, GET_TODOS, TOGGLE_FETCHING} from "../actions";

const initialState = {
    todos: [],
    error: "none",
    isFetching: false,
};

export const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_FETCHING:
            return { ...state, isFetching: !state.isFetching};
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
