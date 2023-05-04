import { GET_VIEW } from "../actions/todo.actions";

const initialState = [];

const viewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIEW:
      return action.payload;

    default:
      return state;
  }
};

export default viewReducer;
