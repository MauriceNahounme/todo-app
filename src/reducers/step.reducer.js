import { GET_STEPS } from "../actions/step.actions";

const initialState = [];

const stepReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STEPS:
      return action.payload;

    default:
      return state;
  }
};

export default stepReducer;
