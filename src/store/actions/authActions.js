import { createAction } from 'redux-actions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  HANDLE_SIGN_IN,
} from './constants';

export const userLoaded = createAction(USER_LOADED);
export const userLoading = createAction(USER_LOADING);

export const authError = createAction(AUTH_ERROR);

export const handleSignin = createAction(HANDLE_SIGN_IN, (formData) => ({
  formData,
}));
export const loginSuccess = createAction(LOGIN_SUCCESS, (user) => ({ user }));
export const loginFail = createAction(LOGIN_FAIL, (checkLogin) => ({
  checkLogin,
}));

export const logoutSuccess = createAction(LOGOUT_SUCCESS);

export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFail = createAction(REGISTER_FAIL);
