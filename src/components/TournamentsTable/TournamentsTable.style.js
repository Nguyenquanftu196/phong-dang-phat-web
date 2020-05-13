export const styles = (theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4)
  },
  searchContainer: {
    display: 'flex'
  },
  tournamentName: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '& > img': {
      width: 30,
      marginRight: 10
    }
  },
  contentSeason: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > div': {
      width: '15%',
      float: 'right',
      marginBottom: 15,
      marginLeft: 15
    }
  },
  region: {
    width: '20px !important',
    margin: '0 !important'
  },
  formControl: {
    minWidth: 150,
    marginRight: 10,
  },
  label: {
    background: '#fff',
    transform: 'translate(14px, 13px) scale(1)',
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
  tableRow: {
    cursor: 'pointer'
  }
});


