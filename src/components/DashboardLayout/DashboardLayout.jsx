import React, { Component } from 'react';
import { Classes } from 'react-jss';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles, Typography, Toolbar, IconButton, AppBar } from '@material-ui/core';
import { styles } from './DashboardLayout.style';
import { MenuDrawer } from '../MenuDrawer';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';


export const DashboardLayout = withTranslation()(
  withStyles(styles)(
    class extends Component {
      static propTypes = {
        classes: PropTypes.shape(Classes).isRequired,
        t: PropTypes.func.isRequired
      };

      constructor(props) {
        super(props);
        this.state = {
          open: true
        };
      }

      onDrawerOpen = () => {
        this.setState({ open: true });
      };

      onDrawerClose = () => {
        this.setState({ open: false });
      };

      render() {
        const { classes, children, session } = this.props;
        const { open, team } = this.state;

        return (
          <div className={classes.root}>
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open
              })}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.onDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                {/* <Typography noWrap>Data Win</Typography> */}
                <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" className={classes.logo}/>
                <div className={classes.grow} />
              </Toolbar>
            </AppBar>
            <MenuDrawer open={open} onDrawerClose={this.onDrawerClose} />
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open
              })}
            >
              <div className={classes.drawerHeader} />
              {children}
            </main>
          </div>
        );
      }
    }
  )
);
