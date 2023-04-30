import { combineReducers } from "redux";
import stepReducer from "./step.reducer";
import taskReducer from "./task.reducer";

export default combineReducers({
  stepReducer,
  taskReducer,
});
