import { createAction } from 'redux-actions';

export const redirect = createAction('REDIRECT', (redirectURL) => ({
  redirectURL,
}));
