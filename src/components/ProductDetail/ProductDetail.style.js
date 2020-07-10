export const styles = (theme) => ({
  mainInfoAd: {
    display: 'flex',
    padding: 15
  },
  mainSlide: {
    width: '60%',
  },
  contentInfo: {
    width: '40%',
    padding: '15px 0px 0px 20px',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    lineHeight: '1.3em',
    font: '14px/18px Helvetica,Arial,sans-serif'
  },
  mainPrice: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10
  },
  originPrice: {
    color: '#b10e0e',
    fontSize: 20,
    fontWeight: '600'
  },
  percentDiscount: {
    background: '#de2000',
    padding: 5,
    color: '#fff',
    fontWeight: '400',
    borderRadius: 3
  },
  mainAction: {
    marginTop: 15,
    '& > button': {
      width: '100%',
      marginTop: 15
    }
  },
  contentSlogan: {
    marginTop: 15,
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      marginTop: 10,
      '& > span': {
        marginLeft: 10
      }
    }
  },
  bannerFirst: {
    width: '100%',
    marginTop: 15
  },
  mainDetailInfo: {
    marginTop: 20,
    padding: 15,
    '& > h4': {
      margin: 0,
      fontSize: 18,
      borderLeft: '4px solid #1f8b48',
      fontWeight: '500',
      paddingLeft: 15
    }
  },
  mainDetail: {
    marginTop: 25,
    '& > div': {
      borderBottom: '1px solid #ecf0f1',
      padding: '10px 5px',
      display: 'flex',
      '& > label': {
        marginRight: 20,
        color: '#999',
        flex: 1
      },
      '& > span': {
        flex: 8,
        '& > p': {
          margin: 0
        }
      }
    }
  }
});
