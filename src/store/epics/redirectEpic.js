import { last } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { REDIRECT } from '../actions/constants';

const redirectEpic = (action$, state$, dependencies) =>
  action$.pipe(
    ofType(REDIRECT),
    last(({ payload }) => {
      window.location.assign(`${payload.redirectURL}`);
    })
  );

export default redirectEpic;
