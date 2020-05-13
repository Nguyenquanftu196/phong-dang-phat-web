export const styles = (theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  searchContainer: {
    display: 'flex'
  },
  teamName: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
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
  searchBoxInput: {
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
  },
  tournament: {
    display: 'flex',
    alignItems: 'center',
    '& > img': {
      width: 60,
      marginRight: 10
    }
  },
  img: {
    height: 30,
    width: 30,
    maxHeight: 30,
    minHeight: 30,
    maxWidth: 30,
    minWidth: 30
  }
});
