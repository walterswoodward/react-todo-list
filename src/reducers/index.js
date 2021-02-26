import {
    ERROR
  } from "../actions";
  
  const initialState = {
    error: "default error message"
  };

  export const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case ERROR:
        return { ...state, error: action.errorMessage };
      default:
        return state;
    }
  };
  