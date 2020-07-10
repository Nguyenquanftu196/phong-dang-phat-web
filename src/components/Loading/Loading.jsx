import React, { Component } from 'react';
import { Classes } from 'react-jss';
import { PropTypes } from 'prop-types';
import { styles } from './Loading.style';
import { withStyles, CircularProgress } from '@material-ui/core';

export const LoadingComponent = withStyles(styles)(
  class extends Component {
    static propTypes = {
      classes: PropTypes.shape(Classes).isRequired,
      t: PropTypes.func.isRequired,
      location: PropTypes.object.isRequired
    };

    constructor(props) {
      super(props);
      this.state = {
        isLoading: false
      };
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ isLoading: nextProps.isLoading })
    }

    componentDidMount() {
      this.setState({ isLoading: this.props.isLoading })
    }

    render() {
      const { classes } = this.props      

      return (
        <>
          {
            this.state.isLoading && (
              <div className={classes.contentLoading}>
                <CircularProgress
                  color={'primary'}
                  size={40}
                />
              </div>
            )
          }
        </>
      );
    }
  }
);
