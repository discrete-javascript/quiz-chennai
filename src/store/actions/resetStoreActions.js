import { createAction } from 'redux-actions';
import { RESET_STORE } from './constants';

export const resetStore = createAction(RESET_STORE);
