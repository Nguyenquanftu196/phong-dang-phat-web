/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { withStyles, Tabs, Tab } from '@material-ui/core';
import { styles } from './Dashboard.style';
import { SlideImage } from "../SlideImage";
import { ItemCategory } from '../ItemCategory'

export const Dashboard = withStyles(styles)(
  class extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
      }
    }

    componentDidMount(){
      
    }

    render() {
      const { classes, match } = this.props

      return (
        <>
          <SlideImage />
          <ItemCategory />
        </>
      )
    }
  })