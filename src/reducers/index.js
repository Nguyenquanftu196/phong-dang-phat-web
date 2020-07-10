import { combineReducers } from 'redux';
import session from './session';
import keySearchProduct from './SearchProduct'

const rootReducer = combineReducers({
  session,
  keySearchProduct
});

export default rootReducer;