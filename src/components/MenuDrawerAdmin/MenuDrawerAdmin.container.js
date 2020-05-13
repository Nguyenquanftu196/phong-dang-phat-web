import { connect } from 'react-redux';
import { authenticate } from '../../actions/session';
import { MenuDrawerAdmin } from './MenuDrawerAdmin';

const mapToState = state => ({
  session: state.session,
});

const mapToProps = dispatch => ({
  authenticate: session => dispatch(authenticate(session)),
});

export const MenuDrawerAdminContainer = connect(
  mapToState,
  mapToProps,
)(MenuDrawerAdmin);
