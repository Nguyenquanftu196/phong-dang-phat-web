import { connect } from 'react-redux';
import { authenticate } from '../../actions/session';
import { Template } from './TEMPLATE';

const mapToState = state => ({
  session: state.session,
});

const mapToProps = dispatch => ({
  authenticate: session => dispatch(authenticate(session)),
});

export const TemplateContainer = connect(
  mapToState,
  mapToProps,
)(Template);
