import { combineReducers } from "redux";

import quizReducer from "./quizReducer";

const rootReducer = combineReducers({
  quizReducer,
});

export default rootReducer;
