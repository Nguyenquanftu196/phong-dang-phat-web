import { DRAWER_MENU_WIDTH } from "../../constants/css";

export const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_MENU_WIDTH}px)`,
    marginLeft: DRAWER_MENU_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  chevronIcon: {
    color: '#fff'
  },
  listItem: {
    display: 'flex',
    padding: theme.spacing(2),
    alignItems: 'center',
    textDecoration: 'none',
    '& > *': {
      color: '#fff',
      fontSize: '0.9rem'
    },
    '&:hover': {
      background: theme.palette.primary.light
    },
    '&.active': {
      backgroundColor: theme.palette.primary.light
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  innerDrawer: {
    // paddingTop: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: DRAWER_MENU_WIDTH,
    flexShrink: 0,
  },
  listItemIcon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '8px',
  },
  drawerPaper: {
    width: DRAWER_MENU_WIDTH,
    background: theme.palette.primary.main,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    borderBottom: '1px solid rgba(0,0,0,0.12)'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -DRAWER_MENU_WIDTH,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});
