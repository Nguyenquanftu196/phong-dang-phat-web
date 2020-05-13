import { connect } from 'react-redux';
import { authenticate } from '../../actions/session';
import { Alert } from './Alert';

const mapToState = state => ({
  session: state.session,
});

const mapToProps = dispatch => ({
  authenticate: session => dispatch(authenticate(session)),
});

export const AlertContainer = connect(
  mapToState,
  mapToProps,
)(Alert);
