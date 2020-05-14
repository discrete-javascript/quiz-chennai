import {
  filter,
  mapTo,
  map,
  mergeMap,
  withLatestFrom,
  mergeMapTo,
  finalize,
  tap,
} from 'rxjs/operators';
import { Observable, of, interval } from 'rxjs';
import { ofType } from 'redux-observable';
import { REDIRECT } from '../actions/constants';
import history from '../../utils/history';
import { loginFail, loginSuccess } from '../actions/authActions';

// const source = interval(1000);
const redirectEpic = (action$) =>
  action$.pipe(
    ofType(REDIRECT),
    // Instead of map we have to write some logic to redirect to given URL
    map(({ payload }) => {
      console.log(payload);
      return loginSuccess('something');
    })
  );

export default redirectEpic;
