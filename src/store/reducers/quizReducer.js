import { handleActions } from 'redux-actions';
import { difference } from 'lodash';
import {
  setQuizQA,
  calculatePartialScore,
  collectUserAnswers,
} from '../actions/quizQA';
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
        };
      }
      return {
        ...state,
        partialSelection: {
          ...state.partialSelection,
          [question]: difference([answer], getValidatedAnswer).length === 0,
        },
      };
    },
    [collectUserAnswers]: (state, action) => {
      const { question, answer } = action.payload;
      // Here we are collecting the answer if user selects
      // In future we have to create a new state with the same state name and all the question id
      // and add the state accordingly
      return {
        ...state,
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
