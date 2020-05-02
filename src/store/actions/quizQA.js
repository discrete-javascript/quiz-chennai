import { createAction } from "redux-actions";
import { GET_QUIZ_QA, SET_QUIZ_QA } from "./constants";

export const getQuizQA = createAction(GET_QUIZ_QA);
export const setQuizQA = createAction(SET_QUIZ_QA);
