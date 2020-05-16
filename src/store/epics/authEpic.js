import {
  // filter,
  // mapTo,
  // map,
  mergeMap,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import {
  // Observable, from,
  of,
} from 'rxjs';
import { loginFail, loginSuccess } from '../actions/authActions';
import { HANDLE_SIGN_IN } from '../actions/constants';
import { redirect } from '../actions/redirectActions';

const quizEpic = (action$, state$) =>
  action$.pipe(
    ofType(HANDLE_SIGN_IN),
    switchMap((action) =>
      ajax({
        url: 'http://spring-jdbc.cfapps.io/validateUser',
        method: 'POST',
        'Content-Type': 'multipart/form-data',
        body: action.payload.formData,
      }).pipe(
        mergeMap(({ response }) => {
          if (response.length === 0) {
            return of(loginFail(true));
          }
          if (state$.value.authReducer.loginFailed) {
            console.log(response);
            return of(
              loginSuccess(response),
              loginFail(false),
              redirect('/questions')
            );
          } else {
            return of(
              loginSuccess(response),
              loginFail(false),
              redirect('/questions')
            );
          }
        }),
        catchError((error) => {
          console.log('error: ', error, action.payload.formData);
          return of(loginFail(true));
        })
      )
    )
  );

export default quizEpic;
