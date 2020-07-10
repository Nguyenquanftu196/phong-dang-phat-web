export const styles = (theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  dialogContent: {
    marginTop: 15
  },
  createUserContainer: {
  },
  input: {
    fontSize: '0.9em',
  },
  label: {
    backgroundColor: '#fff',
    padding: '0 1px'
  },
  error: {
    color: 'red',
    padding: '0 10px'
  },
  errorStatus: {
    color: 'red',
    margin: 0,
    marginTop: 8
  },
  select: {
    minWidth: 328
  },
  createBtn: {
    marginTop: 20,
    textTransform: 'none'
  },
  dialogActionRoot: {
    padding: '8px 8px',
  }
});
