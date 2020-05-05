import {
  filter,
  mapTo,
  map,
  mergeMap,
  withLatestFrom,
  mergeMapTo,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ofType } from 'redux-observable';
import { VALIDATE_ANSWER } from '../actions/constants';
import { calculatePartialScore, collectUserAnswers } from '../actions/quizQA';

const validateAnswerEpic = (action$) =>
  action$.pipe(
    ofType(VALIDATE_ANSWER),
    mergeMap(({ payload }) =>
      of(calculatePartialScore(payload), collectUserAnswers(payload))
    )
  );

export default validateAnswerEpic;
