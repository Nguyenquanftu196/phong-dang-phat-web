import { connect } from 'react-redux';
import { authenticate } from '../../actions/session';
import { DashboardAdminLayout } from './DashboardAdminLayout';

const mapToState = state => ({
  session: state.session,
});

const mapToProps = dispatch => ({
  authenticate: session => dispatch(authenticate(session)),
});

export const DashboardAdminLayoutContainer = connect(
  mapToState,
  mapToProps,
)(DashboardAdminLayout);
