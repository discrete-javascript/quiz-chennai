import { handleActions } from 'redux-actions';
import { difference } from 'lodash';
import { setQuizQA, calculatePartialScore } from '../actions/quizQA';
import { getAnswers, validateAnswer } from './helper';

const defaultState = {
  quizQA: [],
  answers: {},
  score: [],
};

const reducer = handleActions(
  {
    [setQuizQA]: (state, action) => {
      const QAs = action.payload;
      const answers = getAnswers(QAs);

      return {
        ...state,
        quizQA: action.payload,
        answers,
      };
    },
    [calculatePartialScore]: (state, action) => {
      const { answers } = state;
      const { question, answer } = action.payload;

      const getValidatedAnswer = answers[question];

      if (getValidatedAnswer.length === 1) {
        return {
          ...state,
          score: {
            ...state.score,
            [question]: getValidatedAnswer.includes(answer),
          },
        };
      }
      return {
        ...state,
        score: {
          ...state.score,
          [question]: difference([answer], getValidatedAnswer).length === 0,
        },
      };
    },
  },
  defaultState
);

export default reducer;
