import { handleActions } from 'redux-actions';
import { difference } from 'lodash';
import { setQuizQA, calculatePartialScore } from '../actions/quizQA';
import { getAnswers } from './helper';

const defaultState = {
  quizQA: [],
  answers: {},
  partialSelection: {},
  userAnswers: {},
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
          partialSelection: {
            ...state.partialSelection,
            [question]: getValidatedAnswer.includes(answer),
          },
          userAnswers: {
            ...state.userAnswers,
            [question]: {
              [answer]: true,
            },
          },
        };
      }
      return {
        ...state,
        partialSelection: {
          ...state.partialSelection,
          [question]: difference([answer], getValidatedAnswer).length === 0,
        },
        userAnswers: {
          ...state.userAnswers,
          [question]: {
            [answer]: true,
          },
        },
      };
    },
  },
  defaultState
);

export default reducer;
