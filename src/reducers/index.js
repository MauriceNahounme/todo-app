import { combineReducers } from "redux";
import stepReducer from "./step.reducer";
import todoReducer from "./todo.reducer";
import viewReducer from "./view.reducer";

export default combineReducers({
  stepReducer,
  todoReducer,
  viewReducer,
});
