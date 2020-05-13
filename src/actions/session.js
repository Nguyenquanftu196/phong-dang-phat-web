import { AUTHENTICATE } from './ActionTypes';

export const authenticate = session => ({
  type: AUTHENTICATE,
  session,
});