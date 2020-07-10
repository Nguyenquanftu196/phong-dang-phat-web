import { connect } from 'react-redux';
import { authenticate } from '../../actions/session';
import { DashboardLayout } from './DashboardLayout';
import { searchProduct } from '../../actions/SearchProduct'

const mapToState = state => ({
  session: state.session,
});

const mapToProps = dispatch => ({
  authenticate: session => dispatch(authenticate(session)),
  searchProduct: key => dispatch(searchProduct(key))
});

export const DashboardLayoutContainer = connect(
  mapToState,
  mapToProps,
)(DashboardLayout);
