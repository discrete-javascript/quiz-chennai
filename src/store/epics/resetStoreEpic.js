import { last, every } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import storage from 'redux-persist/lib/storage';
import { RESET_STORE } from '../actions/constants';

const redirectEpic = (action$, state$, dependencies) =>
  action$.pipe(
    ofType(RESET_STORE),
    every(() => {
      storage.removeItem('persist:primary');
      localStorage.removeItem('persist:primary');
      state$ = undefined;
    })
  );

export default redirectEpic;
