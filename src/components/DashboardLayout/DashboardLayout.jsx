import React, { Component } from 'react';
import { Classes } from 'react-jss';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles, Toolbar, IconButton, AppBar, InputBase, Menu, MenuItem, Badge, useScrollTrigger, Zoom, Fab } from '@material-ui/core';
import { styles } from './DashboardLayout.style';
import { MenuDrawer } from '../MenuDrawer';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import i18n from '../../i18n'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { debounce } from 'lodash'
import { withRouter } from 'react-router-dom';

function ScrollTop(props) {
  const { children, window, classes } = props;  
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.contentNavigateTop}>
        {children}
      </div>
    </Zoom>
  );
}

export const DashboardLayout = withRouter(withTranslation()(
  withStyles(styles)(
    class extends Component {
      static propTypes = {
        classes: PropTypes.shape(Classes).isRequired,
        t: PropTypes.func.isRequired,
      };

      constructor(props) {
        super(props);

        this.state = {
          open: true,
          anchorEl: null,
          openLang: false,
          lang: props.i18n.language,
        };
        this.searchProduct = debounce(this.searchProduct, 500)
      }

      onDrawerOpen = () => {
        this.setState({ open: true });
      };

      onDrawerClose = () => {
        this.setState({ open: false });
      };

      handleAnchorEl = (event) => {
        this.setState({ anchorEl: event.currentTarget, openLang: true })
      };

      handleCloseAnchorEl = (lang) => {
        i18n.changeLanguage(lang);
        this.setState({ anchorEl: null, openLang: false, lang })
      }

      searchProduct = async (query) => {
        this.props.searchProduct(query)
      }

      onchangeSearch = (e) => {
        this.searchProduct(e.target.value)
      }

      render() {
        const { classes, children, session } = this.props;
        const { open, anchorEl, openLang, lang } = this.state;

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
                <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" className={classes.logo} onClick={() => this.props.history.push('/')}/>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => this.onchangeSearch(e)}
                  />
                </div>
                <div className={classes.grow} />
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <Badge badgeContent={4} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.handleAnchorEl}
                    color="inherit"
                  >
                    <img src={`${process.env.PUBLIC_URL}/${lang}.png`} className={classes.iconLang}/>
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={openLang}
                    onClose={() => this.handleCloseAnchorEl(lang)}
                  >
                    <MenuItem onClick={() => this.handleCloseAnchorEl('vi')} className={classes.rowLang}>
                      <img src={`${process.env.PUBLIC_URL}/vi.png`} className={classes.iconLang}/>
                      <span>VI</span>
                    </MenuItem>
                    <MenuItem onClick={() => this.handleCloseAnchorEl('en')} className={classes.rowLang}>
                      <img src={`${process.env.PUBLIC_URL}/en.png`} className={classes.iconLang}/>
                      <span>EN</span>
                    </MenuItem>
                  </Menu>
                </div>
              </Toolbar>
            </AppBar>
            <MenuDrawer open={open} onDrawerClose={this.onDrawerClose} />
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open
              })}
            >
              <div className={classes.drawerHeader} id="back-to-top-anchor"/>
              {children}
              <ScrollTop {...this.props}>
                <Fab color="primary" size="small" aria-label="scroll back to top">
                  <KeyboardArrowUpIcon />
                </Fab>
              </ScrollTop>
            </main>
          </div>
        );
      }
    }
  )
));
