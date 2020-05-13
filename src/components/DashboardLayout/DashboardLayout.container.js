import { connect } from 'react-redux';
import { authenticate } from '../../actions/session';
import { DashboardLayout } from './DashboardLayout';

const mapToState = state => ({
  session: state.session,
});

const mapToProps = dispatch => ({
  authenticate: session => dispatch(authenticate(session)),
});

export const DashboardLayoutContainer = connect(
  mapToState,
  mapToProps,
)(DashboardLayout);
