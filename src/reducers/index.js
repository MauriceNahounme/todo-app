import { combineReducers } from "redux";
import stepReducer from "./step.reducer";
import todoReducer from "./todo.reducer";

export default combineReducers({
  stepReducer,
  todoReducer,
});
