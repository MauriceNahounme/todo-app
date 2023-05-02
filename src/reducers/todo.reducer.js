import { GET_TASKS, PUT_TASK } from "../actions/todo.actions";

const initialState = [];

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return action.payload;

    case PUT_TASK:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default taskReducer;
