import React, { Component } from 'react';
import { withStyles, Snackbar } from '@material-ui/core';
import { Classes } from 'react-jss';
import { PropTypes } from 'prop-types';
import { styles } from './Alert.style';
import MuiAlert from '@material-ui/lab/Alert';

export const Alert = withStyles(styles)(
  class extends Component {
    static propTypes = {
      classes: PropTypes.shape(Classes).isRequired,
      t: PropTypes.func.isRequired,
      location: PropTypes.object.isRequired
    };
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    render() {
      const { message, open, security } = this.props;
      return (
        <Snackbar
          open={open}
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          onClose={this.props.onCloseAlert}>
          <MuiAlert elevation={6} variant="filled" onClose={this.props.onCloseAlert} severity={security}>
            {message}
          </MuiAlert>
        </Snackbar>
      );
    }
  }
);
