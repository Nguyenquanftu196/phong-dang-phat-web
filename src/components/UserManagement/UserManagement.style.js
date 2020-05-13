export const styles = (theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  modal: {
    background: '#fff',
    width: 600,
    position: 'absolute',
    border: '2px solid #000',
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    fontSize: '0.9em',
  },
  active: {
    fontSize: 12,
    padding: '2px 5px',
    textAlign: 'center',
    backgroundColor: '#dff0d8',
    color: '#3c763d',
    borderRadius: '.25rem'
  },
  paused: {
    fontSize: 12,
    padding: '2px 5px',
    backgroundColor: '#f2dede',
    textAlign: 'center',
    color: '#a94442',
    borderRadius: '.25rem'
  },
  createBtn: {
    minWidth: 85,
    textTransform: 'none'
  },
  listItemIcon: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1)
  }
});
