import { connect } from 'react-redux';
import { authenticate } from './actions/session';
import { App } from './App';

const mapToState = state => ({
  session: state.session,
});

const mapToProps = dispatch => ({
  authenticate: session => dispatch(authenticate(session)),
});

export const AppContainer = connect(
  mapToState,
  mapToProps,
)(App);
