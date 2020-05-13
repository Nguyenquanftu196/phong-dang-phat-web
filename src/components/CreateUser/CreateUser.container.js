import { connect } from 'react-redux';
import { authenticate } from '../../actions/session';
import { CreateUser } from './CreateUser';

const mapToState = state => ({
  session: state.session,
});

const mapToProps = dispatch => ({
  authenticate: session => dispatch(authenticate(session)),
});

export const CreateUserContainer = connect(
  mapToState,
  mapToProps,
)(CreateUser);
