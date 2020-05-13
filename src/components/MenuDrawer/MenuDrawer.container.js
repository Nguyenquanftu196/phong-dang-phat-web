import { connect } from 'react-redux';
import { authenticate } from '../../actions/session';
import { MenuDrawer } from './MenuDrawer';

const mapToState = state => ({
  session: state.session,
});

const mapToProps = dispatch => ({
  authenticate: session => dispatch(authenticate(session)),
});

export const MenuDrawerContainer = connect(
  mapToState,
  mapToProps,
)(MenuDrawer);
