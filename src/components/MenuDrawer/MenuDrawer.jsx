import React, { Component } from 'react';
import { Classes } from 'react-jss';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Logout } from 'mdi-material-ui';
import { withStyles, Drawer, Typography, IconButton, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { styles } from './MenuDrawer.style';
import classnames from 'classnames';
import IconDashboard from './assets/dashboard.svg';
import IconOrder from './assets/Ic_orders.svg';
import IconEmployees from './assets/Ic_employee.svg';
import IconClients from './assets/Ic_client.svg';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { COOKIE_USER } from '../../constants/session';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

export const MenuDrawer = withRouter(
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

          this.state = {
            open: false,
          };
        }

        onLogout = () => {
          Cookies.remove(COOKIE_USER);
          window.location.assign('/');
        };

        render() {
          const { classes, t, location, open, session } = this.props;

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
              {/* <Divider /> */}
              <div className={classes.innerDrawer}>
                <Link
                  to="/"
                  className={classnames(classes.listItem)}
                >
                  <div className={classes.listItemIcon}>
                    <img src={IconDashboard} height={20} alt="icon" />
                  </div>
                  <Typography>{t('Home')}</Typography>
                </Link>
                <Link
                  to="/players"
                  className={classnames(classes.listItem, {
                    active: location.pathname.includes('/players')
                  })}
                >
                  <div className={classes.listItemIcon}>
                    <img src={IconOrder} height={20} alt="icon" />
                  </div>
                  <Typography>{t('Players')}</Typography>
                </Link>
                <Link
                  to="/teams"
                  className={classnames(classes.listItem, { active: location.pathname.includes('/teams') })}
                >
                  <div className={classes.listItemIcon}>
                    <img src={IconEmployees} height={20} alt="icon" />
                  </div>
                  <Typography>{t('Teams')}</Typography>
                </Link>
                <Link
                  to="/tournaments"
                  className={classnames(classes.listItem, {
                    active: location.pathname.includes('/tournaments')
                  })}
                >
                  <div className={classes.listItemIcon}>
                    <img src={IconClients} height={20} alt="icon" />
                  </div>
                  <Typography>{t('Tournaments')}</Typography>
                </Link>
                <ExpansionPanel style={{ backgroundColor: '#1f8b48', boxShadow: 'none', color: '#fff' }}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon style={{ color: '#fff' }}/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Expansion Panel 1</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                      sit amet blandit leo lobortis eget.
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel style={{ backgroundColor: '#1f8b48', boxShadow: 'none', color: '#fff' }}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon style={{ color: '#fff' }}/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography className={classes.heading}>Expansion Panel 2</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                      sit amet blandit leo lobortis eget.
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
              <div className={classes.grow} />
              <div>
                {
                  (session.user) ? (
                    <div className={classes.listItem} onClick={this.onLogout}>
                      <div className={classes.listItemIcon}>
                        <Logout />
                      </div>
                      <Typography>{t('Logout')}</Typography>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className={classnames(classes.listItem, {
                        active: location.pathname.includes('/login')
                      })}
                    >
                      <div className={classes.listItemIcon}>
                        <Logout />
                      </div>
                      <Typography>{t('Login')}</Typography>
                    </Link>
                  )
                }
                {/* <div className={classes.listItem} onClick={this.onLogout}>
                  <div className={classes.listItemIcon}>
                    <Logout />
                  </div>
                  <Typography>{t('Login')}</Typography>
                </div> */}
              </div>
            </Drawer>
          );
        }
      }
    )
  )
);
