import {
  filter,
  mapTo,
  map,
  mergeMap,
  withLatestFrom,
  mergeMapTo,
} from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { ofType } from 'redux-observable';
import { VALIDATE_ANSWER } from '../actions/constants';
import { calculatePartialScore, validateAnswer } from '../actions/quizQA';

const validateAnswerEpic = (action$, state$) =>
  action$.pipe(
    ofType(VALIDATE_ANSWER),
    map(({ payload }) => calculatePartialScore(payload))
  );

export default validateAnswerEpic;
