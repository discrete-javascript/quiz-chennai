import { combineReducers } from 'redux';

import quizReducer from './quizReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  quizReducer,
  authReducer,
});

export default rootReducer;
