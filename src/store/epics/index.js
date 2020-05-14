import { combineEpics } from 'redux-observable';
import { catchError } from 'rxjs/operators';
import quizEpic from './quizEpic';
import validateAnswerEpic from './validateAnswerEpic';
import authEpic from './authEpic';
import redirectEpic from './redirectEpic';

const rootEpic = (action$, store$, dependencies) =>
  combineEpics(
    quizEpic,
    validateAnswerEpic,
    authEpic,
    redirectEpic
  )(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);
      return source;
    })
  );

export default rootEpic;
