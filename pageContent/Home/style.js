const style = (theme) => ({
  root: {
    '& section': {
      display: 'inline-flex',
      flexDirection: 'column',
      padding: '18px 0',
    },

    '& ul': {
      listStyle: 'none',
      padding: '0',
    },
  },
  productList: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  productCard: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    height: '160px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px',
  },
  searchForm: {
    margin: '12px 0 24px',
  }
  
});

export default style