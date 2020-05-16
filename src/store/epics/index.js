import { combineEpics } from 'redux-observable';
import { catchError } from 'rxjs/operators';
import quizEpic from './quizEpic';
import validateAnswerEpic from './validateAnswerEpic';
import authEpic from './authEpic';
import redirectEpic from './redirectEpic';
import resetStoreEpic from './resetStoreEpic';

const rootEpic = (action$, store$, dependencies) =>
  combineEpics(
    quizEpic,
    validateAnswerEpic,
    authEpic,
    redirectEpic,
    resetStoreEpic
  )(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);
      return source;
    })
  );

export default rootEpic;
