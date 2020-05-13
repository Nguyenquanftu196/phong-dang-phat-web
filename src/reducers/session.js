import { AUTHENTICATE } from '../actions/ActionTypes';

export default (state = {}, action) => {
  const { type, session } = action;
  switch (type) {
    case AUTHENTICATE:
      return session;
    default:
      return state;
  }
};