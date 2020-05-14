import { handleActions } from 'redux-actions';
import { loginFail } from '../actions/authActions';

const defaultState = {
  loginFailed: false,
};

const reducer = handleActions(
  {
    [loginFail]: (state, action) => ({
      ...state,
      loginFailed: action.payload.checkLogin,
    }),
  },
  defaultState
);

export default reducer;
