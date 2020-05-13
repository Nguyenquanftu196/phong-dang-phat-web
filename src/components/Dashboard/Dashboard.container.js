import { connect } from 'react-redux';
import { authenticate } from '../../actions/session';
import { Dashboard } from './Dashboard';

const mapToState = state => ({
  session: state.session,
});

const mapToProps = dispatch => ({
  authenticate: session => dispatch(authenticate(session)),
});

export const DashboardContainer = connect(
  mapToState,
  mapToProps,
)(Dashboard);
