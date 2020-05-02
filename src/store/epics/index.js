import { combineEpics } from "redux-observable";
import { catchError } from "rxjs/operators";
import quizEpics from "./quizEpics";

const epics = {
  quizEpics,
};

const rootEpic = (action$, store$, dependencies) =>
  combineEpics(quizEpics)(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);
      return source;
    })
  );

export default rootEpic;
