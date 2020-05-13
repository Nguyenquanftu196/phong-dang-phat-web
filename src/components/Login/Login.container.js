import { connect } from 'react-redux';
import { authenticate } from '../../actions/session';
import { Login } from './Login';

const mapToState = state => ({
  session: state.session,
});

const mapToProps = dispatch => ({
  authenticate: session => dispatch(authenticate(session)),
});

export const LoginContainer = connect(
  mapToState,
  mapToProps,
)(Login);
