import React, { Component } from 'react';
import { Classes } from 'react-jss';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  withStyles
} from '@material-ui/core';
import { styles } from './TournamentsTable.style';

export const TournamentsTable = withTranslation()(
  withStyles(styles)(
    class extends Component {
      static propTypes = {
        classes: PropTypes.shape(Classes).isRequired,
        t: PropTypes.func.isRequired
      };

      constructor(props) {
        super(props);

        this.state = {
        }
      }

      render() {
        const { classes, t } = this.props;

        return (
          <div className={classes.root} >
            <h3>Tournament</h3>
          </div >
        );
      }
    }
  )
);
