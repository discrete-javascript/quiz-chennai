import { last } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { REDIRECT } from '../actions/constants';
import history from '../../utils/history';

const redirectEpic = (action$) =>
  action$.pipe(
    ofType(REDIRECT),
    last(({ payload }) => {
      history.push(`${payload.redirectURL}`);
      window.location.reload();
    })
  );

export default redirectEpic;
