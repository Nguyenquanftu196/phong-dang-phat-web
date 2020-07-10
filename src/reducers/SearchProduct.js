import { KEYSEARCHPRODUCT } from '../actions/ActionTypes';

export default (state = {}, action) => {
  const { type, keySearchProduct } = action;
  switch (type) {
    case KEYSEARCHPRODUCT:
      return keySearchProduct;
    default:
      return state;
  }
};