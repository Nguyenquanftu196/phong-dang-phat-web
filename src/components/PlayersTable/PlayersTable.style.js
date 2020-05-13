export const styles = (theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4)
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  formControl: {
    minWidth: 150,
    marginRight: 10,
  },
  tableHead: {
    marginTop: 10,
    marginBottom: 25
  },
  inputBase: {
    fontWeight: 300
  },
  searchBox: {
    background: '#fff',
    minWidth: 175
  },
  inputSearch: {
    padding: 0,
    height: 40
  },
  contentNation: {
    display: 'flex',
    alignItems: 'center',
    '& > img': {
      width: 30,
      marginRight: 15
    }
  },
  listItemIcon: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1)
  },
  label: {
    backgroundColor: '#fff',
    transform: 'translate(14px, 13px) scale(1)',
  },
  selectRoot: {
    height: 40,
    display: "table",
    background: '#fff'
  },
  select: {
    height: 40,
    paddingTop: 0,
    paddingBottom: 0,
    display: "flex",
    alignItems: "center"
  },
  tableWrapper: {
    overflowX: 'scroll'
  },
  contentSeason: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > div': {
      width: '15%',
      float: 'right',
      marginBottom: 15
    }
  },
  teamLogo: {
    '& > img': {
      height: 60,
      marginRight: 15
    },
    display: 'flex'
  },
  nameCtn: {
    display: 'flex',
    alignItems: 'center',
    '& > img': {
      height: 30,
      width: 30,
      marginRight: 15,
      objectFit: 'cover',
      borderRadius: '50%'
    }
  },
  contentBack: {
    display: 'flex',
    alignItems: 'center',
    '& > label': {
      marginLeft: 10,
      cursor: 'pointer'
    },
    cursor: 'pointer',
    marginBottom: 15
  }
});
