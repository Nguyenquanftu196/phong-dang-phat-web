import React, { Component } from 'react';
import { Classes } from 'react-jss';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Logout } from 'mdi-material-ui';
import { withStyles, Drawer, Typography, IconButton, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { styles } from './MenuDrawer.style';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { COOKIE_USER } from '../../constants/session';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import BallotIcon from '@material-ui/icons/Ballot'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import GroupIcon from '@material-ui/icons/Group';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import { Category } from '../../models/category'
import { map } from 'lodash'

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
            categories: []
          };
        }

        onLogout = () => {
          Cookies.remove(COOKIE_USER);
          window.location.assign('/');
        };

        listCategory = async () => {
          const result = await Category.list(null, 0)
          this.setState({ categories: result.rows })
        }

        componentDidMount() {
          this.listCategory()
        }

        render() {
          const { classes, t, location, open, session } = this.props;
          const { categories } = this.state

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
                <h3 className={classes.titleCate}>{t("Menu")}</h3>
                <IconButton onClick={this.props.onDrawerClose}>
                  <ChevronLeftIcon className={classes.chevronIcon} />
                </IconButton>
              </div>
              <div className={classes.innerDrawer}>
                <ExpansionPanel style={{ backgroundColor: '#1f8b48', boxShadow: 'none', color: '#fff' }}>
                  <Link className={classnames(classes.listItem)} >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon style={{ color: '#fff' }} />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      classes={{ root: classes.mainSummary }}
                    >
                      <div className={classes.listItemIcon}>
                        <BallotIcon />
                      </div>
                      <Typography>{t('Category_1')}</Typography>
                    </ExpansionPanelSummary>
                  </Link>
                  <ExpansionPanelDetails classes={{ root: classes.mainCateDetail }}>
                    {
                      map(categories, cate => (
                        <Link className={classnames(classes.listItem)}>
                          <Typography>{(this.props.i18n.language === 'en') ? cate.nameEN : cate.nameVN}</Typography>
                        </Link>
                      ))
                    }
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <Link
                  to="/players"
                  className={classnames(classes.listItem, {
                    active: location.pathname.includes('/players')
                  })}
                >
                  <div className={classes.listItemIcon}>
                    <AccountBoxIcon />
                  </div>
                  <Typography>{t('Players')}</Typography>
                </Link>
                <Link
                  to="/teams"
                  className={classnames(classes.listItem, { active: location.pathname.includes('/teams') })}
                >
                  <div className={classes.listItemIcon}>
                    <GroupIcon />
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
                    <SubtitlesIcon />
                  </div>
                  <Typography>{t('Tournaments')}</Typography>
                </Link>
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
