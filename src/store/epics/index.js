import { combineEpics } from 'redux-observable';
import { catchError } from 'rxjs/operators';
import quizEpic from './quizEpic';
import validateAnswerEpic from './validateAnswerEpic';

const rootEpic = (action$, store$, dependencies) =>
  combineEpics(quizEpic, validateAnswerEpic)(
    action$,
    store$,
    dependencies
  ).pipe(
    catchError((error, source) => {
      console.error(error);
      return source;
    })
  );

export default rootEpic;
