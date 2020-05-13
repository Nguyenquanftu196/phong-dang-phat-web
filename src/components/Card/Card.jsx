import React, { Component } from 'react';

import { withStyles } from '@material-ui/core';
import { styles } from './Card.style';

export const Card = withStyles(styles)(
  class extends Component {

    render() {
      const { classes, children } = this.props;

      return (
        <div className={classes.root}>
          {children}
        </div>
      );
    }
  },
);
