import { handleActions } from 'redux-actions';
import { loginFail, loginSuccess } from '../actions/authActions';

const defaultState = {
  loginFailed: false,
  user: [],
};

const reducer = handleActions(
  {
    [loginFail]: (state, action) => ({
      ...state,
      loginFailed: action.payload.checkLogin,
    }),
    [loginSuccess]: (state, action) => ({
      ...state,
      user: action.payload.user,
    }),
  },
  defaultState
);

export default reducer;
