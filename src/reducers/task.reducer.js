import { GET_TASKS } from "../actions/task.actions";

const initialState = [];

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return action.payload;

    default:
      return state;
  }
};

export default taskReducer;
