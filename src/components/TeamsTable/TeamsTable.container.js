import { connect } from 'react-redux';
import { authenticate } from '../../actions/session';
import { TeamsTable } from './TeamsTable';

const mapToState = state => ({
  session: state.session,
});

const mapToProps = dispatch => ({
  authenticate: session => dispatch(authenticate(session)),
});

export const TeamsTableContainer = connect(
  mapToState,
  mapToProps,
)(TeamsTable);
