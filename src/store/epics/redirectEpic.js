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
import { loginFail } from '../actions/authActions';

// const source = interval(1000);
const redirectEpic = (action$) => {
    const redirect = action$.pipe(ofType(REDIRECT).subscribe(val => console.log(val));;
};

export default redirectEpic;
