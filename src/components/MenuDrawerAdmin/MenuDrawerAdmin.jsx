import React, { Component } from 'react';
import { Classes } from 'react-jss';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles, Drawer, Typography, IconButton, Divider } from '@material-ui/core';
import { styles } from './MenuDrawerAdmin.style';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Logout } from 'mdi-material-ui';
import Cookies from 'js-cookie';
import { COOKIE_USER } from '../../constants/session';
import StorageIcon from '@material-ui/icons/Storage';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PollIcon from '@material-ui/icons/Poll';

export const MenuDrawerAdmin = withRouter(
  withTranslation()(
    withStyles(styles)(
      class extends Component {
        static propTypes = {
          classes: PropTypes.shape(Classes).isRequired,
          t: PropTypes.func.isRequired,
          location: PropTypes.object.isRequired
        };

        constructor(props) {
          super(props);

          this.state = { open: false };
        }
        onLogout = () => {
          Cookies.remove(COOKIE_USER);
          window.location.assign('/login');
        };

        render() {
          const { classes, t, location, open } = this.props;

          return (
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.props.onDrawerClose}>
                  <ChevronLeftIcon className={classes.chevronIcon} />
                </IconButton>
              </div>
              <Divider />
              <div className={classes.innerDrawer}>
                <Link
                  to="/"
                  className={classnames(classes.listItem, { active: location.pathname === '/users' })}
                >
                  <div className={classes.listItemIcon}>
                    <AccountBoxIcon />
                  </div>
                  <Typography>{t('Users')}</Typography>
                </Link>
                <Link
                  to="/admin/product"
                  className={classnames(classes.listItem, { active: location.pathname === '/admin/product' })}
                >
                  <div className={classes.listItemIcon}>
                    <StorageIcon />
                  </div>
                  <Typography>{t('Product')}</Typography>
                </Link>
                <Link
                  to="/admin/category"
                  className={classnames(classes.listItem, { active: location.pathname === '/admin/category' })}
                >
                  <div className={classes.listItemIcon}>
                    <PollIcon />
                  </div>
                  <Typography>{t('Category')}</Typography>
                </Link>
              </div>
              <div className={classes.grow} />
              <div>
                <div className={classes.listItem} onClick={this.onLogout}>
                  <div className={classes.listItemIcon}>
                    <Logout />
                  </div>
                  <Typography>{t('Logout')}</Typography>
                </div>
              </div>
            </Drawer>
          );
        }
      }
    )
  )
);
