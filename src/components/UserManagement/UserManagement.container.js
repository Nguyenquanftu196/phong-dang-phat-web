import { connect } from 'react-redux';
import { authenticate } from '../../actions/session';
import { UserManagement } from './UserManagement';

const mapToState = state => ({
  session: state.session,
});

const mapToProps = dispatch => ({
  authenticate: session => dispatch(authenticate(session)),
});

export const UserManagementContainer = connect(
  mapToState,
  mapToProps,
)(UserManagement);
