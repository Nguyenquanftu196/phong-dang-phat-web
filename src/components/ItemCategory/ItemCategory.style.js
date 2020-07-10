export const styles = (theme) => ({
  titleCate: {
    fontSize: 18,
    borderLeft: '4px solid #1f8b48',
    fontWeight: '500',
    paddingLeft: 20
  },
  imgProduct: {
    height: 250,
    width: '100%',
    marginBottom: 10
  },
  containerItem: {
    textAlign: 'center',
    '& > label': {
      fontWeight: '500',
      fontSize: 18
    },
    border: '1px solid #eee',
    cursor: 'pointer'
  },
  originPrice: {
    color: '#b10e0e'
  },
  mainPrice: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10
  },
  percentDiscount: {
    background: '#de2000',
    padding: 5,
    color: '#fff',
    fontWeight: '400',
    borderRadius: 3
  },
  btnAddToCart: {
    marginTop: 10,
    width: '100%'
  },
  notifyNoAd: {
    marginTop: '20%',
    textAlign: 'center'
  }
});
