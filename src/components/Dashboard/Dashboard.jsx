/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { withStyles, Tabs, Tab } from '@material-ui/core';
import { styles } from './Dashboard.style';

export const Dashboard = withStyles(styles)(
  class extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
      }
    }

    render() {
      const { classes, match } = this.props

      return (
        <>
          <h3>home</h3>
        </>
      )
    }
  })