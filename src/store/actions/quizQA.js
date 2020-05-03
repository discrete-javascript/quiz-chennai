import { createAction } from 'redux-actions';
import {
  GET_QUIZ_QA,
  SET_QUIZ_QA,
  VALIDATE_ANSWER,
  CALCULATE_PARTIAL_SCORE,
} from './constants';

export const getQuizQA = createAction(GET_QUIZ_QA);
export const setQuizQA = createAction(SET_QUIZ_QA);

export const validateAnswer = createAction(
  VALIDATE_ANSWER,
  (question, answer) => ({
    question,
    answer,
  })
);

export const calculatePartialScore = createAction(CALCULATE_PARTIAL_SCORE);
