import { handleActions } from "redux-actions";
import { setQuizQA } from "../actions/quizQA";

const defaultState = {
  quizQA: [],
};

const reducer = handleActions(
  {
    [setQuizQA]: (state, action) => ({
      ...state,
      quizQA: action.payload,
    }),
  },
  defaultState
);

export default reducer;
